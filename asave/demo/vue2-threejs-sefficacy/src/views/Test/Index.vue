<template>
  <div>
    <div ref="container"></div>
    <div id="c3d-container">
      <div id="c3d">
        <div class="c3d-text">测试文字</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 创建场景、相机和渲染器
      let scene = new THREE.Scene()
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(renderer.domElement)
      // 创建正方体1
      let texture = new THREE.TextureLoader().load('/image/1.jpg')
      let geometry1 = new THREE.BoxGeometry(20, 20, 20)
      let material1 = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, wireframeLinewidth: 10 })
      let cube1 = new THREE.Mesh(geometry1, material1)
      cube1.position.z = -20;
      scene.add(cube1)
      // 创建 CSS3DRenderer 和 CSS3DObject
      let cssRenderer = new CSS3DRenderer()
      cssRenderer.setSize(window.innerWidth, window.innerHeight)
      cssRenderer.domElement.style.position = 'absolute'
      cssRenderer.domElement.style.top = 0
      document.getElementById('c3d-container').appendChild(cssRenderer.domElement)
      // this.$refs.container.appendChild(cssRenderer.domElement)
      let element = document.getElementById('c3d')
      let cssObject = new CSS3DObject(element)
      scene.add(cssObject)
      // 创建正方体2
      let geometry2 = new THREE.BoxGeometry(20, 20, 20)
      let material2 = new THREE.MeshBasicMaterial({ map: texture })
      let cube2 = new THREE.Mesh(geometry2, material2)
      cube2.position.z = 20;
      scene.add(cube2)
      // 设置相机位置
      camera.position.z = 150;
      camera.position.y = 150;
      camera.position.x = 150;
      // 创建 OrbitControls 控制器
      let controls = new OrbitControls(camera, renderer.domElement)
      controls.minDistance = 100;
      controls.maxDistance = 1000;
      controls.update()
      // 渲染循环
      let animate = () => {
        requestAnimationFrame(animate)
        controls.update() // 更新控制器状态
        renderer.render(scene, camera)
        cssRenderer.render(scene, camera)
      }
      animate()
    }
  }
}
</script>
<style lang="scss">
#container {
  width: 100%;
  height: 100%;
}
#c3d-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // 禁用鼠标事件
}
#c3d {
  background: red;
  .c3d-text {
    color: #fff;
    font-size: 10px;
  }
}
</style>
