function cesiumInit(){
    Cesium.BingMapsApi.defaultKey = 'AkEkMS-0Fi6puNHS1ZH8INyw-K9H856zNfTGo76TB9oGawhxCRhSShi_p3R6h-_R';
    var viewer = new Cesium.Viewer('cesiumContainer', {
        animation: true,
        baseLayerPicker: true,
        fullscreenButton: true,
        geocoder: true,
        homeButton: true,
        infoBox: true,
        sceneModePicker: true,
        selectionIndicator: false,
        timeline: true,
        navigationHelpButton: true,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: false,
        terrainExaggeration: 2.0,
        vrButton: true,

    });
    var scene = viewer.scene;
    var camera = scene.camera;
    var globe = scene.globe;
    viewer.scene.globe.enableLighting = true;
    viewer.extend(Cesium.viewerDragDropMixin);

    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
    });
    viewer.terrainProvider = terrainProvider;

    var layers = viewer.scene.imageryLayers;
    var layer = new Cesium.TileCoordinatesImageryProvider({
        color: Cesium.Color.MOCCASIN,
    });
    /*layers.addImageryProvider(layer);
    result = {};
    layers.addImageryProvider(new Cesium.GridImageryProvider({
        cells: 10,
        color: Cesium.Color.SKYBLUE,
    },
    Cesium.Color.fromAlpha(Cesium.Color.MAGENTA, .5, result)));

    /*layers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
            url : 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
            layers : 'nexrad-n0r',
            credit : 'Radar data courtesy Iowa Environmental Mesonet',
            parameters : {
                transparent : 'true',
                format : 'image/png'
            },
            proxy : new Cesium.DefaultProxy('/proxy/')
        })
    );*/

    return viewer;
};
viewer = cesiumInit();

$('#isLightingSelected').click(function() {
    if (this.checked === true){
        viewer.scene.globe.enableLighting = true;
    }else if(this.checked === false){
        viewer.scene.globe.enableLighting = false;
    };
});

$('#isWaterMaskSelected').click(function() {
    if (this.checked === true){
        viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestVertexNormals: true,
            requestWaterMask: true,
        });
    }else if(this.checked === false){
        viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestVertexNormals: true,
            requestWaterMask: false,
        });
    };
});

$('#isTerrainProviderSelected').click(function() {
    if (this.checked === true){
        $('#isWaterMaskSelected').prop('disabled', false);
        viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestVertexNormals: true,
            requestWaterMask: true,
        });
    }else if(this.checked === false){
        $('#isWaterMaskSelected').prop('disabled', true)
        viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    };
});

handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(click) {
    var pickedObject = viewer.scene.pick(click.position);
    var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
    if (cartesian) {
        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
        var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
        $('#lat').text('Lat: ' + latitude);
        $('#lon').text('Lon: ' + longitude);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

