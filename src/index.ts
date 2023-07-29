import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,

    //addBasePlugins,    /****Se comento o edito este en Julio 14 2023***/
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,
    AssetImporter,
    mobileAndTabletCheck,


} from "webgi";
import "./styles.css";
import "./styles-section-one.css";
import "./styles-section-two.css";
import "./styles-section-third.css";
import "./styles-section-four.css";
import "./styles-section-six.css";
import "./styles-section-seven.css";
import "./styles-section-eight.css";
import "./styles-swiper.css";
import "./styles-footer.css";
import "./styles-popup.css";

/*
import "./js/contactform.js";
import "./js/custom.js";
import "./js/particles.min.js";
import "./js/swiper.js";
import "./js/typing.js";
*/


import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false, //Se agrego este para asegurar la transparencia
    })

    //Check if is Mobile the WebSite
    const isMobile = mobileAndTabletCheck()


    /****Se comento o edito este en Julio 15 2023***/
    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)  /****Se comento o edito este en Julio 14 2023***/
    await viewer.addPlugin(new ProgressivePlugin(32))  /****Se comento o edito este en Julio 14 2023***/
     await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))     /****Se comento o edito este en Julio 14 2023***/
    // await viewer.addPlugin(GammaCorrectionPlugin)
     await viewer.addPlugin(SSRPlugin)    /****Se comento o edito este en Julio 14 2023***/
     await viewer.addPlugin(SSAOPlugin)  /****Se comento o edito este en Julio 14 2023***/
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    await viewer.addPlugin(BloomPlugin)  /****Se comento o edito este en Julio 14 2023***/
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    // Loader
    const importer = manager.importer as AssetImporter

    importer.addEventListener("onProgress", (ev)=>{
        const progressRatio = (ev.loaded / ev.total)
        document.querySelector('.progress')?.setAttribute('style', 'transform: scaleX(${progressRatio})')
    })

    importer.addEventListener("onLoad", (ev)=>{
        gsap.to('.loader', {
            x:'100%',
            duration: 0.8, 
            ease: 'power4.inOut', delay: 1,
            onComplete: ()=>{
                document.body.style.overflowY = 'auto'
            }
        })

    })

  


    /****Se comento o edito este en Julio 14 2023***/

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    // Import and add a GLB file.
    await viewer.load("./assets/rocket-00.glb")

            //Function IsMobile


    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap((await manager.importer!.importSinglePath<ITexture>("./assets/environment.hdr"))!);

    // Add some UI for tweak and testing.
    //const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    //uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

        /******** Create Animations ********/
        
        if(isMobile){
            position.set(-5.86, -2.64, 2.45)
            target.set(-0.65, -0.21, 0.01)
           
        }
        
  

        //onUpdate()

        window.scrollTo(0,0)

        function setupScrollAnimation(){

            const tl = gsap.timeline()
    
            //********First Section que en realidad va a la SECOND
            //Aqui van los datos de la SECOND
            tl.to(position, {x: isMobile ? -5.36 : -4.71, y: isMobile ? 6.03 : -0.60, z: isMobile ? -2.54 : 0.46, /*duration: 4,*/ 
               scrollTrigger: {
                trigger: ".second",
                start: "top bottom",
                end: "top top",
                markers: false,
                scrub: true,
                immediateRender: false
               }, onUpdate})

               /**/
               .to(".section-one--container", {xPercent: '-150', opacity: 0, 
                scrollTrigger: {
                 trigger: ".second",
                 start: "top bottom",
                 markers: false,
                 end: "top 80%", scrub: 1,
                 immediateRender: false
                }, onUpdate})

               /**/

                .to(target, {x:isMobile ? -0.29 :-0.9, y: isMobile ? -0.12: 0.39, z: isMobile ? 0.01 :-0.49, /*duration: 4,*/ 
                scrollTrigger: {
                 trigger: ".second",
                 start: "top bottom",
                 end: "top top",
                 markers: false,
                 scrub: true,
                 immediateRender: false
                }, onUpdate})

                //********Third Section 
                .to(position, {x:isMobile? -5.13 : -1.01, y:isMobile? 9.34 : 4.79, z:isMobile? -1.80 :-3.37, /*duration: 4,*/ 
                    scrollTrigger: {
                     trigger: ".third",
                     start: "top bottom",
                     end: "top top",
                     markers: false,
                     scrub: true,
                     immediateRender: false
                    }, onUpdate})
     
                .to(target, {x:isMobile? 0.23 : 1.19, y:isMobile? 0.42 :0.93, z:isMobile? -0.60 :-0.80, /*duration: 4,*/ 
                     scrollTrigger: {
                      trigger: ".third",
                      start: "top bottom",
                      end: "top top",
                      markers: false,
                      scrub: true,
                      immediateRender: false
                     }, onUpdate})

                //********Four Section 
                .to(position, {x:isMobile? -8.50 :-4.08, y:isMobile? -1.21 :-0.68, z:isMobile? -2.13 :-0.95, /*duration: 4,*/ 
                    scrollTrigger: {
                     trigger: ".four",
                     start: "top bottom",
                     end: "top top",
                     markers: false,
                     scrub: true,
                     immediateRender: false
                    }, onUpdate})
     
                .to(target, {x:isMobile? -0.35 :0.61, y:isMobile? 0.34 : 0.33, z:isMobile? 0.02 :0.84, /*duration: 4,*/ 
                     scrollTrigger: {
                      trigger: ".four",
                      start: "top bottom",
                      end: "top top",
                      markers: false,
                      scrub: true,
                      immediateRender: false
                     }, onUpdate})

                //********Five Section 
                .to(position, {x:isMobile?-7.46 :6.25, y:isMobile? -3.43 :-1.14, z:isMobile? 2.88 :-1.64, /*duration: 4,*/ 
                    scrollTrigger: {
                     trigger: ".five",
                     start: "top bottom",
                     end: "top top",
                     markers: false,
                     scrub: true,
                     immediateRender: false
                    }, onUpdate})
     
                .to(target, {x:isMobile? -0.67 :0.87, y:isMobile? 0.73 :0.44, z:isMobile? -0.26 : 1.17, /*duration: 4,*/ 
                     scrollTrigger: {
                      trigger: ".five",
                      start: "top bottom",
                      end: "top top",
                      markers: false,
                      scrub: true,
                      immediateRender: false
                     }, onUpdate})

                //********Six Section 
                .to(position, {x:isMobile? -8.45 :-4.16, y:isMobile? -3.12 : -4.30, z:isMobile? -1.47 : 6.55, /*duration: 4,*/ 
                    scrollTrigger: {
                     trigger: ".six",
                     start: "top bottom",
                     end: "top top",
                     markers: false,
                     scrub: true,
                     immediateRender: false
                    }, onUpdate})
     
                .to(target, {x:isMobile?-0.86 :-0.71, y:isMobile? 0.57 :0.31, z:isMobile? 0.00 :0.35, /*duration: 4,*/ 
                     scrollTrigger: {
                      trigger: ".six",
                      start: "top bottom",
                      end: "top top",
                      markers: false,
                      scrub: true,
                      immediateRender: false
                     }, onUpdate})

                //********Seven Section 
                .to(position, {x:isMobile? -8.88 :-8.61, y:isMobile? -1.37 :-4.02, z:isMobile? 1.98 :-4.88, /*duration: 4,*/ 
                    scrollTrigger: {
                     trigger: ".seven",
                     start: "top bottom",
                     end: "top top",
                     markers: false,
                     scrub: true,
                     immediateRender: false
                    }, onUpdate})
     
                .to(target, {x:isMobile? -0.67 :-1.43, y:isMobile? -0.00 :0.72, z:isMobile? -0.07 :0.81, /*duration: 4,*/ 
                     scrollTrigger: {
                      trigger: ".seven",
                      start: "top bottom",
                      end: "top top",
                      markers: false,
                      scrub: true,
                      immediateRender: false
                     }, onUpdate})

                //********Eight Section 
                /*
                .to(position, {x:-3.91, y:-1.34, z:1.24, duration: 4, 
                    scrollTrigger: {
                     trigger: ".eight",
                     start: "top bottom",
                     end: "top top",
                     markers: true,
                     scrub: true
                    }, onUpdate})
     
                .to(target, {x:-1.33, y:-0.02, z:-0.13, duration: 4, 
                     scrollTrigger: {
                      trigger: ".eight",
                      start: "top bottom",
                      end: "top top",
                      markers: true,
                      scrub: true
                     }, onUpdate})
                */
        }



        setupScrollAnimation()

        //WEBGI UPDATE
        let needsUpdate = true;

        function onUpdate(){
            needsUpdate = true
            viewer.renderer.resetShadows()
        }

        viewer.addEventListener('preFrame', ()=> {
            if(needsUpdate){
                camera.positionUpdated(true) //poner a true
                camera.targetUpdated(true) //poner a true
                needsUpdate = false
            }
        })



}


setupViewer()
