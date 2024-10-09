import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Locate from "@arcgis/core/widgets/Locate"; 

const ArcGISMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const webmap = new WebMap({
      basemap: "streets-navigation-vector", 
    });

  
    const view = new MapView({
      container: mapRef.current,
      map: webmap,
      center: [-118.805, 34.027], 
      zoom: 13, 
    });

    const locateWidget = new Locate({
      view: view, 
      useHeadingEnabled: false, 
      goToOverride: function(view, options) {
        options.target.scale = 1500; 
        return view.goTo(options.target);
      }
    });

    view.ui.add(locateWidget, "top-left"); 

    return () => {
      if (view) {
        view.destroy(); 
      }
    };
  }, []);

  return (
    <div>
      {/* Map container */}
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default ArcGISMap;
