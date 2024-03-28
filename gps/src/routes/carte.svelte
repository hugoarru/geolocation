<script>
    import { onMount } from 'svelte';
    let map;
  
    // const googleMapsApiKey = 
  
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    onMount(() => {
      // La fonction initMap sera appelée une fois que la carte Google sera chargée
      window.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 47.26344680786133, lng: -1.5686731338500977 },
          zoom: 14,
          mapId: 'DEMO_MAP_ID'
        });
  
        new google.maps.Marker({
          position: { lat: 47.26344680786133, lng: -1.5686731338500977 },
          map: map,
          title: 'Mon emplacement'
        });
      };
  
      // Chargez la carte Google Maps
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    });
  </script>
  
  <style>
    #map {
      height: 100px;
      width: 100px;
    }
  
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
  
  <div id="map"></div>