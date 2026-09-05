// MB COMMAND CENTER
// Peta Sulawesi Selatan

const map = L.map('map').setView([-3.7, 120.0], 7);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(map);

// Data batas Kabupaten/Kota Indonesia
const geoJsonUrl =
  'https://raw.githubusercontent.com/AlfianAliM/Indonesia-GeoJSON/master/kab_kota.geojson';

fetch(geoJsonUrl)
  .then(response => response.json())
  .then(data => {

    // Ambil hanya wilayah Sulawesi Selatan
    const sulsel = {
      type: 'FeatureCollection',
      features: data.features.filter(feature => {

        const props = feature.properties;

        return (
          props.province === 'Sulawesi Selatan' ||
          props.Provinsi === 'Sulawesi Selatan' ||
          props.PROVINSI === 'SULAWESI SELATAN'
        );

      })
    };

    L.geoJSON(sulsel, {

      style: {
        color: '#ff7a00',
        weight: 2,
        fillColor: '#ff9800',
        fillOpacity: 0.35
      },

      onEachFeature: function (feature, layer) {

        const props = feature.properties;

        const nama =
          props.name ||
          props.NAME_2 ||
          props.NAMOBJ ||
          props.kabupaten ||
          props.KabKota ||
          'Wilayah Sulawesi Selatan';

        layer.bindPopup(
          '<b>MUDA BERGERAK</b><br>' +
          'DPD ' + nama
        );

        layer.on({
          mouseover: function () {
            layer.setStyle({
              fillOpacity: 0.7,
              weight: 3
            });
          },

          mouseout: function () {
            layer.setStyle({
              fillOpacity: 0.35,
              weight: 2
            });
          }
        });

      }

    }).addTo(map);

  })
  .catch(error => {
    console.error('Gagal memuat peta:', error);
  });
