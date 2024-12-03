<template>
  <div ref="container"></div>
</template>
<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化主渲染场景、相机和渲染器
      let mainScene = new THREE.Scene()
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5;
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(renderer.domElement)
      // 控制相机
      let controls = new OrbitControls(camera, renderer.domElement)
      controls.maxDistance = 10;
      // 添加立方体1（无辉光效果）
      let geometry1 = new THREE.BoxGeometry(2, 2, 2)
      let material1 = new THREE.MeshBasicMaterial({ color: '#00ffff' })
      let cube1 = new THREE.Mesh(geometry1, material1)
      cube1.position.x = -2;
      mainScene.add(cube1)
      // 初始化辉光渲染场景和渲染器
      let bloomScene = new THREE.Scene()
      // 添加立方体2（带辉光效果）
      let geometry2 = new THREE.BoxGeometry(2, 2, 2)
      let material2 = new THREE.MeshBasicMaterial({ color: '#ff00ff' })
      let cube2 = new THREE.Mesh(geometry2, material2)
      cube2.position.x = 2
      bloomScene.add(cube2)
      // 创建主渲染通道
      let mainRenderPass = new RenderPass(mainScene, camera)
      // 创建辉光通道
      let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
      bloomPass.threshold = 0
      bloomPass.strength = 1
      bloomPass.radius = 0
      // 创建主渲染器和辉光渲染器
      let mainComposer = new EffectComposer(renderer)
      mainComposer.addPass(mainRenderPass)
      let bloomComposer = new EffectComposer(renderer)
      bloomComposer.addPass(mainRenderPass)
      bloomComposer.addPass(bloomPass)
      // 合并通道
      let finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 )
            }
          `,
          fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
              gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) )
            }
          `,
          defines: {}
        }), 'baseTexture'
      )
      finalPass.needsSwap = true;
      finalPass.renderToScreen = true
      let animate = () => {
        requestAnimationFrame(animate)
        // 渲染主场景
        renderer.clear()
        // mainComposer.render()
        // // 渲染辉光场景
        bloomComposer.render()
        // 最终合并
        // finalPass.uniforms.baseTexture.value = mainComposer.renderTarget2.texture;
        // renderer.render(bloomScene, camera)
      }
      animate()
    }
  }
}
</script>
<style>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
