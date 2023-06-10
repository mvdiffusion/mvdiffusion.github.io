'use strict';

(function() {
    // Format video selector for compositional prompts.
    let captions = ["a DSLR photo of a squirrel  chopping vegetables",
"an intricate wooden carving of a squirrel  wielding a katana"];

    let imagen_pieces = [
        ["a DSLR photo of a squirrel", "an intricate wooden carving of a squirrel", "a highly detailed metal sculpture of a squirrel"],
        ["", "wearing a kimono", "wearing a medieval suit of armor", "wearing a purple hoodie", "wearing an elegant ballgown"],
        ["", "reading a book", "riding a motorcycle", "playing the saxophone", "chopping vegetables", "sitting at a pottery wheel shaping a clay bowl",
        "riding a skateboard", "wielding a katana", "eating a hamburger", "dancing"],
    ];

    const updateCompositionVideo = () => {
        let phrase = "";
        for (let depth = 1; depth <= imagen_pieces.length; depth++) {
            let tagContainer = document.getElementById('compositional_tags_depth_' + depth);
            let selected = tagContainer.querySelectorAll('.selected');

            // Make sure at most one item is selected at this level.
            if (selected.length > 1) {
                // Too many tags selected at this level. Shouldn't have happened, but unselect them.
                selected.slice(1, selected.length).forEach((chunk) => {
                    chunk.classList = "";
                });
            }

            // Make sure at least one item is selected at this level.
            if (selected.length == 0) {
                tagContainer.querySelector('span').classList = "selected";
                updateCompositionVideo();
                return;
            }

            let segment = selected[0].getAttribute("data-segment");
            phrase = phrase + segment;
        }

        if (captions.includes(phrase)) {
            let compositionalVideo = document.getElementById('compositionalVideo');
            let container = compositionalVideo.parentNode;
            let videoName = phrase.replaceAll(' ', '_');
            let sourceURL = "https://mvdiffusion.github.io/assets/videos/" + videoName;
            console.log('phrase found: ', phrase, sourceURL);

            let width = compositionalVideo.offsetWidth;
            let height = compositionalVideo.offsetHeight;

            let oldSourceEl = document.getElementById('compositionalVideoSrc');
            oldSourceEl.src = sourceURL;

            container.style = "opacity: 0;";
            setTimeout(() => {
                container.style = "opacity: 1;";
                compositionalVideo.load();
            }, 750);

            let captionEl = document.getElementById('compositionalCaption');
            if (captionEl)
                captionEl.innerHTML = phrase;
        } else {
            console.log('phrase NOT found: ' + phrase);
        }
    };

    const deselect = (element) => {
        element.classList = ("" + element.classList).replace('selected', ' ');  // not clean, what about spaces?
    }

    const tagClicked = (event) => {
        event.target.parentNode.querySelectorAll('.selected').forEach(deselect);
        event.target.classList = "selected";
        updateCompositionVideo();
    };

    let phraseContainer = document.querySelector('.compositional .text');
    imagen_pieces.forEach((phrases, depth) => {
        depth = depth + 1;
        let tagContainer = document.createElement("P");
        tagContainer.classList = "selectable left";
        tagContainer.id = "compositional_tags_depth_" + depth;

        phrases.forEach((segment, i) => {
            if (depth > 1) {
                segment = " " + segment;
            }

            let tag = document.createElement("SPAN");
            let text = segment.trim();
            if (!text)
                text = '[...]';

            tag.appendChild(document.createTextNode(text));
            tag.setAttribute("data-segment", segment);
            tag.onclick = tagClicked;
            if (i == 0)
                tag.classList = "selected";

            tagContainer.appendChild(tag);
        });

        phraseContainer.appendChild(tagContainer);
    });

})();


(function() {
    // Create mesh holders.
    let sharedAttributes = {
        ar: true,
        "ar-modes": "webxr scene-viewer quick-look",
        loading: "lazy",
        reveal: "manual",
        // crossorigin: "anonymous",
        style: "height: 300px; width: 100%;",
        "camera-controls": true,
        "touch-action": "pan-y",
        "shadow-intensity": "1",
        exposure: "1"
    };

    let meshAttributes = {
        scene0724_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0724_00_0.glb",
            poster: "/assets/meshes2/scene0724_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0760_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0760_00_0.glb",
            poster: "/assets/meshes2/scene0760_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0733_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0733_00_0.glb",
            poster: "/assets/meshes2/scene0733_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0749_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0749_00_0.glb",
            poster: "/assets/meshes2/scene0749_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0734_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0734_00_0.glb",
            poster: "/assets/meshes2/scene0734_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0741_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0741_00_0.glb",
            poster: "/assets/meshes2/scene0741_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0737_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0737_00_0.glb",
            poster: "/assets/meshes2/scene0737_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
        scene0738_00_0: {
            src: "https://www.sfu.ca/~fuyangz/mvdiffusion/mesh/scene0738_00_0.glb",
            poster: "/assets/meshes2/scene0738_00_0.png",
            "environment-image": "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr",
            caption: "",
            shortCaption: "",
        },
    };

    let meshRows = [
        ['scene0724_00_0', 'scene0760_00_0'],
        ['scene0733_00_0', 'scene0749_00_0'],
        ['scene0734_00_0', 'scene0741_00_0'],
        ['scene0737_00_0', 'scene0738_00_0'],
    ];

    let container = document.getElementById("meshContainer");
    meshRows.forEach((meshIds) => {
        let row = document.createElement("DIV");
        row.classList = "row";

        meshIds.forEach((meshId) => {
            let col = document.createElement("DIV");
            col.classList = "col-md-6 col-sm-6 my-auto";
            
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

            // Controls.
            let controls = document.createElement("div");
            controls.className = "controls";
            let buttonLoad = document.createElement("button");
            buttonLoad.classList = "btn btn-primary loads-model";
            buttonLoad.setAttribute("data-controls", model.id);
            buttonLoad.appendChild(document.createTextNode("Load 3D model"));
            // let buttonToggle = document.createElement("button");
            // buttonToggle.classList = "btn btn-primary toggles-texture";
            // buttonToggle.setAttribute("data-controls", model.id);
            // buttonToggle.appendChild(document.createTextNode("Toggle texture"));
            controls.appendChild(buttonLoad);
            // controls.appendChild(buttonToggle);

            // Caption.
            let caption = document.createElement("p");
            caption.classList = "caption";
            caption.title = meshAttributes[meshId]["caption"] || "";
            caption.appendChild(document.createTextNode(meshAttributes[meshId]["shortCaption"] || caption.title));

            col.appendChild(model);
            col.appendChild(controls);
            col.appendChild(caption);
            row.appendChild(col);
        });

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
