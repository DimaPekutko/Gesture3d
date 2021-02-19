const Nanobar = require("nanobar");
const { Scene } = require("three");
const THREE = require("three");
const GLTFLoader = require("three-gltf-loader");
const OrbitControls = require('three-orbitcontrols')

module.exports = class App {
    constructor() {
        this.workspaceContainer = document.getElementsByClassName("workspace_container")[0];
        this.fileInput = document.getElementById("file_input");
        this.currentRenderObject = "";
        this.cubeModel = 
        this.nanobar = new Nanobar({
            target: document.getElementById("nanobar")
        });
        this.fileInput.addEventListener("change", this.onFileInputChange, false);
        this.makeScene();
    }
    onFileInputChange() {
        const filePath = this.fileInput.value;
        //validation
        this.setModelPath(filePath);
    }
    renderScene() {
        // console.log(this.threeScene);
        if(this.currentRenderObject) {
            this.currentRenderObject.rotateY(0.03)
            // this.currentRenderObject.rotateX(0.03);
            // this.currentRenderObject.rotateZ(0.03);
        } else {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({color: "red"});
            const cube = new THREE.Mesh(geometry, material);
            cube.scale.set(1.5,1.5,1.5);
            this.threeScene.add(cube);
            this.currentRenderObject = cube;
            this.threeScene.background = new THREE.Color("#000000");
            this.threeCamera.position.z = 5;
        }
        // console.log(this.threeRenderer);
        this.threeRenderer.render(this.threeScene, this.threeCamera);
        requestAnimationFrame(this.renderScene.bind(this));
    }
    makeScene() {
        this.threeScene = new THREE.Scene();
        this.threeCamera = new THREE.PerspectiveCamera(
            75, this.workspaceContainer.clientWidth/this.workspaceContainer.clientHeight, 0.1, 1000
        );
        this.threeRenderer = new THREE.WebGLRenderer();
        this.threeRenderer.setSize(this.workspaceContainer.clientWidth, this.workspaceContainer.clientHeight); 
        this.threeRenderer.domElement.id = "workspaceCanvas";
        this.workspaceContainer.appendChild(this.threeRenderer.domElement);
        this.renderScene(this);
    }
    load3dModel() {
        
    }
    setNanobar(value) {
        this.nanobar.go(value);
    }
    setModelPath(path) {
        this.model3dPath = path;
    }
}