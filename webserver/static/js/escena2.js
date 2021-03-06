      // Buscar el index.html que lee jsons
      // como hacer objetos, jalar texto, imprimir texto 
      // Orbit controls
      // texturas y luces
      // setinterval para simular el movimiento de la cámara o los textos.
      // canvas para las letras 

// initscene

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      
      var theta, radius = 100; 
      var controls;

      controls = new THREE.OrbitControls( camera, renderer.domElement );

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;
      
      controls.screenSpacePanning = false;
      
//      controls.minDistance = 100;
  //    controls.maxDistance = 500;
      
     //  controls.maxPolarAngle = Math.PI / 2;
      

      // Luces

      
      light1 = new THREE.PointLight( 0x50b732, 2, 50 );
      //light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
      scene.add( light1 );
      
      light2 = new THREE.PointLight( 0x3b5fd1, 2, 50 );
      //light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
      scene.add( light2 );
      
      light3 = new THREE.PointLight( 0xde3fe1, 2, 50 );
      //light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
      scene.add( light3 );
      
      light4 = new THREE.PointLight( 0x7930a7, 2, 50 );
      // light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
      scene.add( light4 );
      
      // jONSTONS
      
      function loadJSON(callback, name) {
	  
          let xobj = new XMLHttpRequest();
          xobj.overrideMimeType("application/json");
          if(typeof name == 'undefined'){
              //xobj.open('GET', '/static/js/analysis_ordered.json', true);
	      xobj.open('GET', 'http://167.172.217.175/analysis/tweets/', true);
	      
          }else{
              xobj.open('GET', `${name}`, true);
          }
          xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
		  
                  // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                  callback(JSON.parse(xobj.responseText));
              }
          };
          xobj.send(null);
      }

      var mensajes = [];
      const tweets = [];
      const tam = [];
      const raw = [];
      let name;
      var text = []; 
     
      loadJSON(getData);

	      
      function getData(data){
	  let datos = data.ordered
	  datos.forEach( function(dato){
	      let word = dato[0]
	      
		  word = word.replace('á','a')
		  word = word.replace('é','e')
		  word = word.replace('í','i')
		  word = word.replace('ó','o')
		  word = word.replace('ú','u')

	      let ocurrences = dato[1]	      
	      // console.log(word, ocurrences)
	      // mensajes.push(word);
	      tweets.push(word);
  	      tam.push(ocurrences);
          })

      }
         
      // var o = JSON.parse(s);
      
      // console.log(tweets[1]);

      
      materials = [
	  new THREE.MeshPhongMaterial( { color: 0x848484, flatShading: true } ), // front
	  new THREE.MeshPhongMaterial( { color: 0x848484 } ) // side
      ];

      var loader = new THREE.FontLoader();      

      var cube = [];
      var cameraPosition; 
      
      var params = {
	  envMap: 'HDR',
	  roughness: 0.3,
	  metalness: 0.1,
	  exposure: 1.0,
	  debug: false
      };

      // var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );

      
      var material = new THREE.MeshStandardMaterial( {
	  color: 0xffffff,
	  metalness: params.metalness,
	  roughness: params.roughness
      } );
    
     
      
      // var materialFonts = new THREE.MeshBasicMaterial( { color: 0xffffff} );

      
      //var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

	  // Textos
	 
      loader.load( '/static/fonts/helvetiker_bold.typeface.json', function ( font ) {

	  for(var i = 0; i < tam.length ; i ++){
	           	       
	      // Cubos 
	      
	      var geometry = new THREE.SphereGeometry(20, 20, 20);
	      
	      // geometry.center();
	      //geometry.computeVertexNormals(); 
	      geometry.computeBoundingBox();
	      
	      
	      //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      
	  
	      cube[i] = new THREE.Mesh( geometry, material );

	      var x, y, z;
	      
	      //x = Math.random() * 400 - 200;
	      //y = Math.random() * 400 - 200;
	      //z = Math.random() * 400 - 200;

	      var theta1 = Math.random() * (Math.PI*2);
	      var theta2 = Math.random() * (Math.PI*2); 

	      var posX, posY, posZ;

	      posX = Math.cos(theta1) * Math.cos(theta2);
	      posY = Math.sin(theta1);
	      posZ = Math.cos(theta1) * Math.sin(theta2);

	      //mesh.geometry.
	      cube[i].position.x = posX * (0.75*tam[i]);
	      cube[i].position.y = posY * (0.75*tam[i]);
	      cube[i].position.z = posZ * (0.75*tam[i]);

	      cube[i].scale.x = tam[i]/1800;
	      cube[i].scale.y = tam[i]/1800;
	      cube[i].scale.z = tam[i]/1800;
	      
	      //cube.lookAt(0, 0, 0); 
	      
	      //cube[i].matrixAutoUpdate = false;
	      // cube[i].updateMatrix();
	      
	      this.scene.add(cube[i]);

	      var shapes = font.generateShapes( tweets[i], tam[i]/128 );
     
	      var geometry2 = new THREE.ShapeBufferGeometry( shapes );

	      geometry.computeBoundingBox(); 
	      // geometry.center(); 
	      // geometry.computeBoundingBox();
	      
	      text = new THREE.Mesh( geometry2, material );
	      
	      text.position.x = posX * (0.5 * tam[i]);
	      text.position.y = posY * (0.5 * tam[i]);
	      text.position.z = posZ * (0.5 * tam[i]);

	      text.scale = tam[i] * 0.25; 

	      text.lookAt(0, 0, 0); 
	      
	      this.scene.add(text); 
	  }
	      
	  })
      
	 		  
      // scene.add( cube );
		  
      camera.position.z = 10; // el orbits no funciona en posición 0 

      // console.log(camera.position); 
		  
      var animate = function () {

	  requestAnimationFrame( animate );

      	  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

	  //var vector = camera.position.clone();

	  // vector.applyMatrix( camera.matrixWorld );

	  //.lookAt(light1); 
	  //camera.lookAt( 0, 0, 0 );
	  //camera.updateMatrixWorld();
	  
	  //camera.position.x += 0.001;
	  
	  //camera.position.y += 0.001;
	  var time = Date.now() * 0.0005;

	  // camera.position.z += 0.05;
	  light1.position.x = Math.sin( time * 0.7 ) * 30;
	  light1.position.y = Math.cos( time * 0.5 ) * 40;
	  light1.position.z = Math.cos( time * 0.3 ) * 30;
	  
	  light2.position.x = Math.cos( time * 0.3 ) * 30;
	  light2.position.y = Math.sin( time * 0.5 ) * 40;
	  light2.position.z = Math.sin( time * 0.7 ) * 30;
	  
	  light3.position.x = Math.sin( time * 0.7 ) * 30;
	  light3.position.y = Math.cos( time * 0.3 ) * 40;
	  light3.position.z = Math.sin( time * 0.5 ) * 30;
	  
	  light4.position.x = Math.sin( time * 0.3 ) * 30;
	  light4.position.y = Math.cos( time * 0.7 ) * 40;
	  light4.position.z = Math.sin( time * 0.5 ) * 30;
	  

	  camera.rotateX(0.0002);
	  camera.rotateY(0.0003);
	  
	  //camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	  //camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	  //camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
	  // pointLight.position.set(vector);
	  camera.updateProjectionMatrix();

	  renderer.render( scene, camera );
      };
      
animate();
