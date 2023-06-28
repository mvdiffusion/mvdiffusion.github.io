'use strict';

(function() {
    // Create mesh holders.
    let sharedAttributes = {
        ar: true,
        "ar-modes": "webxr scene-viewer quick-look",
        loading: "lazy",
        reveal: "manual",
        // crossorigin: "anonymous",
        style: "height: 180px; width: 100%;",
        "camera-controls": true,
        "touch-action": "pan-y",
        "shadow-intensity": "1",
        exposure: "1"
    };

    let meshAttributes = {
        scene0724_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0724_00_0.glb",
            poster: "/assets/meshes2/scene0724_00_0.png",
            caption: "",
            shortCaption: "",
        },
        scene0734_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0734_00_0.glb",
            poster: "/assets/meshes2/scene0734_00_0.png",
            caption: "",
            shortCaption: "",
        },
        scene0737_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0737_00_0.glb",
            poster: "/assets/meshes2/scene0737_00_0.png",
            caption: "",
            shortCaption: "",
        },
        scene0738_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0738_00_0.glb",
            poster: "/assets/meshes2/scene0738_00_0.png",
            caption: "",
            shortCaption: "",
        },
    };

    let meshRows = [
        'scene0724_00_0', 'scene0734_00_0',
        'scene0737_00_0', 'scene0738_00_0',
        //'scene0746_00_0', 'scene0752_00_0',
        //'scene0753_00_0', 'scene0773_00_0',
    ];

    let container = document.getElementById("meshContainer");
    meshRows.forEach((meshId) => {
        let row = document.createElement("DIV");
        row.classList = "row captioned_videos meshes";

        let text_div1 = document.createElement("DIV");
        text_div1.classList = "col-4";
        let text1 = document.createElement("P");
        text1.classList = "text-center";
        text1.textContent = 'Mesh w/o texture'
        text_div1.appendChild(text1);
        row.appendChild(text_div1);

        let text_div2 = document.createElement("DIV");
        text_div2.classList = "col-4";
        let text2 = document.createElement("P");
        text2.classList = "text-center";
        text2.textContent = 'Input depth | Pred texture'
        text_div2.appendChild(text2);
        row.appendChild(text_div2);

        let button_div = document.createElement("DIV");
        button_div.classList = "col-4 controls";
        let button = document.createElement("button");
        button.classList = "btn btn-primary loads-model";
        button.setAttribute("data-controls", 'mesh-' + meshId);
        button.setAttribute("data-action", "load");
        button.appendChild(document.createTextNode("Load 3D model"));
        button_div.appendChild(button);
        row.appendChild(button_div);

        let mesh_no_texture_img_div = document.createElement("DIV");
        mesh_no_texture_img_div.classList = "col-4";
        let mesh_no_texture_img = document.createElement("img");
        mesh_no_texture_img.src = "/assets/meshes2/" + meshId + "_non_texture.png";
        mesh_no_texture_img.style = "width: 100%;";
        mesh_no_texture_img.alt = "";
        mesh_no_texture_img_div.appendChild(mesh_no_texture_img);
        row.appendChild(mesh_no_texture_img_div);

        let video_div = document.createElement("DIV");
        video_div.classList = "col-4";
        let video_container = document.createElement("DIV");
        video_container.classList = "video-compare-container";
        video_container.style = "width: 100%;";
        let video = document.createElement("video");
        video.classList = "video lazy";
        video.style = "height: 0px;";
        video.id = meshId + "_video";
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;
        video.onplay = function() { resizeAndPlay(this); };
        let source = document.createElement("source");
        source.setAttribute("data-src", "https://www.sfu.ca/~fuyangz/mvdiffusion/depth_video/" + meshId + ".mp4");
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);
        video_container.appendChild(video);
        //canvas = document.createElement("canvas");
        //canvas.classList = "videoMerge";
        //canvas.height = 752;
        //canvas.width = 1002;
        //canvas.id = meshId + "_canvas";
        //video_container.appendChild(canvas);

        video_div.appendChild(video_container);
        row.appendChild(video_div);

        let mode_view_div = document.createElement("DIV");
        mode_view_div.classList = "col-md-4 col-sm-4 my-auto";
        // Model viewer.
        let model = document.createElement("model-viewer");
        for (const attr in sharedAttributes) {
            if (attr != "caption" && attr != "shortCaption")
                model.setAttribute(attr, sharedAttributes[attr]);
        }
        for (const attrCustom in meshAttributes[meshId]) {
            if (attrCustom != "caption" && attrCustom != "shortCaption")
                model.setAttribute(attrCustom, meshAttributes[meshId][attrCustom]);
        }
        model.id = 'mesh-' + meshId;
        mode_view_div.appendChild(model);
        row.appendChild(mode_view_div);

        // Caption.
        let caption = document.createElement("p");
        caption.classList = "caption";
        caption.title = meshAttributes[meshId]["caption"] || "";
        caption.appendChild(document.createTextNode(meshAttributes[meshId]["shortCaption"] || caption.title));

        container.appendChild(row);
    });

    // Toggle texture handlers.
    document.querySelectorAll('button.toggles-texture').forEach((button) => {
        button.addEventListener('click', () => {
            let model = document.getElementById(button.getAttribute("data-controls"));

            console.log(model.model);
            let material = model.model.materials[0];
            let metallic = material.pbrMetallicRoughness;
            let originalTexture = metallic.pbrMetallicRoughness.baseColorTexture;
            let originalBaseColor = metallic.pbrMetallicRoughness.baseColorFactor;
            console.log('model load', model.model, material, 'metallic', metallic, originalTexture);

            let textureButton = model.querySelector('.toggles-parent-texture');
            console.log('texture button', textureButton);
            // if (originalTexture && textureButton) {
            let textureOn = true;
            textureButton.onclick = () => {
                if (textureOn) {
                    // model.model.materials[0].pbrMetallicRoughness.baseColorTexture.setTexture(null);
                    // model.model.materials[0].pbrMetallicRoughness.setBaseColorFactor([1., 1., 1., 1.]);
                    // textureOn = false;
                    // console.log('toggle texture off');
                } else {
                    // model.model.materials[0].pbrMetallicRoughness.baseColorTexture.setTexture(originalTexture) ;
                    // model.model.materials[0].pbrMetallicRoughness.setBaseColorFactor(originalBaseColor);
                    // textureOn = true;
                    // console.log('toggle texture on');
                }
            };
        });
    });

    // Click to load handlers for 3D meshes.
    document.querySelectorAll('button.loads-model').forEach((button) => {
        button.setAttribute('data-action', 'load');
        button.addEventListener('click', () => {
            // button.classList = button.classList + " disappearing";
            // let model = button.parentElement.parentElement;
            let model = document.getElementById(button.getAttribute("data-controls"));

            if (button.getAttribute('data-action') == 'load') {
                model.dismissPoster();
                button.classList = "btn btn-disabled";
                button.innerHTML = "Hide 3D model";
                button.setAttribute('data-action', 'unload');
            } else {
                model.showPoster();
                button.classList = "btn btn-primary";
                button.innerHTML = "Load 3D model";
                button.setAttribute('data-action', 'load');
            };
        });
    });
    // document.querySelectorAll('button.toggles-parent-texture').forEach((button) => {
    //     let model = button.parentElement.parentElement;
    //     let originalTexture = model.materials[0].pbrMetallicRoughness.baseColorTexture;
    //     let textureOn = true;
    //     button.addEventListener('click', () => {
    //         if (textureOn) {
    //             model.materials[0].pbrMetallicRoughness.baseColorTexture.setTexture(null);
    //             textureOn = false;
    //         } else {
    //             model.materials[0].pbrMetallicRoughness.baseColorTexture.setTexture(originalTexture) ;
    //             textureOn = true;
    //         }
    //     });
    // });
})();
