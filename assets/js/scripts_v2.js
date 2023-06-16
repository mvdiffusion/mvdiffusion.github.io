'use strict';

(function() {
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
