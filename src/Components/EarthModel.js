import React, { Component } from 'react'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import image from '../assets/black_white_earth_uv_map.png';

export default class ModelCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {time: '', date: ''};
  }
  componentDidMount() {

    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth * 0.49) / (window.innerHeight * 0.7), 0.1, 1000 );
    camera.position.set( 0, 0, 2 );
    
    const renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
    renderer.setSize( window.innerWidth * 0.49, (window.innerHeight * 0.7) );
    renderer.outputEncoding = THREE.sRGBEncoding;
    this.mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dampingFactor = 0.03;

    const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 30, 30),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(image)
        })
    );
    scene.add(sphere);
    
    let WaterlooPoint = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.02, 20, 20),
      new THREE.MeshBasicMaterial({color: 0x15f4ee})
    )
    
    let HanoiPoint = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.02, 20, 20),
      new THREE.MeshBasicMaterial({color: 0x911f21})
    )
      
    var WaterlooPt = {lat: 43.4516, lng: 80.4925};
    var WaterlooCoords = getCoordinatesFromLatLng(WaterlooPt.lat, WaterlooPt.lng, 1);
    WaterlooPoint.position.set(WaterlooCoords.x, WaterlooCoords.y, WaterlooCoords.z);
    // sprite.position.set(WaterlooCoords.x, WaterlooCoords.y, WaterlooCoords.z);
    
    var HanoiPt = {lat: 23, lng: 253.5};
    var HanoiCoords = getCoordinatesFromLatLng(HanoiPt.lat, HanoiPt.lng, 1);
    HanoiPoint.position.set(HanoiCoords.x, HanoiCoords.y, HanoiCoords.z);

    scene.add(WaterlooPoint);
    scene.add(HanoiPoint);

    camera.position.z = 2;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(1, 1);
    var intersects = [];

    var animate = function() {
      requestAnimationFrame( animate );
      controls.update();
      renderer.render( scene, camera );
    };

    animate();
  }
  render() {
    return (<div className={this.props.fade} ref={ref => (this.mount = ref)} />);
  }
}

var getCoordinatesFromLatLng = function(latitude, longitude, radiusEarth)
{
  let latitude_rad = latitude * Math.PI / 180;
  let longitude_rad = longitude * Math.PI / 180;
  
  let xPos= radiusEarth * Math.cos(latitude_rad) * Math.cos(longitude_rad);
  let zPos = radiusEarth * Math.cos(latitude_rad) * Math.sin(longitude_rad);
  let yPos = radiusEarth * Math.sin(latitude_rad);
  
  return {x: xPos, y: yPos, z: zPos};
}
