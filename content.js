(function() {
    'use strict';
    var toolbar = document.querySelector("#markItUpId_body > div > div.markItUpHeader > ul")

    var uploadInput = document.createElement('input')

    var textBox = document.querySelector("#id_body")

    uploadInput.type = 'file'

    uploadInput.accept = 'image/*'

    uploadInput.addEventListener('change', e=>{
        var file = uploadInput.files[0]

        var reader = new FileReader()

        reader.readAsArrayBuffer(file)
        window.progresselement = toolbar.appendChild(document.createElement("li"));
        progresselement.innerHTML = "Reading file...";

        reader.onloadend = function () {
            uploadImage(reader.result)
        }
    })
    
    uploadInput.style.display="none"

    if(toolbar && textBox){
        document.body.appendChild(uploadInput)
        document.querySelector(".markItUpButton5").insertAdjacentHTML("afterend",`<li class="markItUpButton markItUpButton17"><a id="uploadButton" href="javascript:;" title="Upload Image" style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVUlEQVQ4jc3SO0tCYRzH8WcOegNtTb2BXkO1SNBuFyJqC1uihhqCNCIH8xKU8BzzcspQEskWC8IWcRCji8WxEnrSCKqh+dvQRTwcybZ+8J3+8Jn+QvyL2byHfDe9c7r/d8CdJlB5JVB5xeZOt10DcKV+gHazuVINQNi9iIUDizJfWdzsXhOQrDeXqOEz3vllvtbAngIgm822DKABJB6b27n/AeZST8zEqyylr4jmT3DsVi0A/a45rQxAOByme+2BzuUbRpOb3L4MIBbLSClNwHa5ua0SALFYDOeZTn/mnI6goke/pmvbsACCpUb+AsJfACASiTB1tULwfZF15Wb+eRDn27gFsHqE2Mh/5skhPDkANE2j/3iWseIkExcOhorD9F32moBh/4iwezEHIKVEKUWtVsMwDOr1OkopE9Bi34CUklAohK7rxONxotEomqa1Bfh++6QPwtgXjMvZERUAAAAASUVORK5CYII=');">Upload</a></li>`)
        document.querySelector("#uploadButton").onmousedown=e=>{
            e.preventDefault()
            uploadInput.click()
        }
        textBox.addEventListener('paste', e=>{
            retrieveImageFromClipboardAsBlob(e,function(imageBlob){
                if(imageBlob){
                    uploadImage(imageBlob)
                }
            })
        })

        textBox.addEventListener('drop', e=>{
            e.preventDefault()
            e.stopPropagation()

            var reader = new FileReader()

            reader.readAsArrayBuffer(e.dataTransfer.files[0])
            //console.log(e.dataTransfer)
            reader.onloadend = function () {
                uploadImage(reader.result)
            }
        })
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
    function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
        if(pasteEvent.clipboardData == false){
            if(typeof(callback) == "function"){
                callback(undefined);
            }
        };

        var items = pasteEvent.clipboardData.items;

        if(items == undefined){
            if(typeof(callback) == "function"){
                callback(undefined);
            }
        };

        for (var i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf("image") == -1) continue;
            // Retrieve image on clipboard as blob
            var blob = items[i].getAsFile();

            if(typeof(callback) == "function"){
                callback(blob);
            }
        }
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function uploadImage(image){
        var randomId = makeid(5)

        console.log(image);
        progresselement.innerHTML = "Creating project...";

        (k=>fetch("/session/",{credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest"}})[k](p=>p.ok?p:Promise.reject(p.status))[k](p=>p.json())[k](j=>j.user.token)[k](token=>{
            fetch("https://projects.scratch.mit.edu/", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site"
                },
                "referrer": "https://scratch.mit.edu/projects/editor/",
                "referrerPolicy": "no-referrer-when-downgrade",
                "body": "{\"targets\":[{\"isStage\":true,\"name\":\"Stage\",\"variables\":{\"`jEk@4|i[#Fk?(8x)AV.-my variable\":[\"my variable\",0]},\"lists\":{},\"broadcasts\":{},\"blocks\":{},\"comments\":{},\"currentCostume\":0,\"costumes\":[{\"assetId\":\"77582e3881becdac32ffd151dbb31f14\",\"name\":\"backdrop1\",\"bitmapResolution\":1,\"md5ext\":\"77582e3881becdac32ffd151dbb31f14.svg\",\"dataFormat\":\"svg\",\"rotationCenterX\":381.96246447447436,\"rotationCenterY\":351.7889839939939}],\"sounds\":[],\"volume\":100,\"layerOrder\":0,\"tempo\":60,\"videoTransparency\":50,\"videoState\":\"on\",\"textToSpeechLanguage\":null}],\"monitors\":[],\"extensions\":[],\"meta\":{\"semver\":\"3.0.0\",\"vm\":\"0.2.0-prerelease.20200720182258\",\"agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36\"}}",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }).then(e=>e.json())
                .then(data=>{
                console.log(data)

                //set title
                console.log(data["content-name"])
                progresselement.innerHTML = "Naming project...";
                fetch("https://api.scratch.mit.edu/projects/"+data["content-name"], {
                    "headers": {
                        "accept": "application/json",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/json",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-token": token
                    },
                    "referrer": "https://scratch.mit.edu/projects/413617319/",
                    "referrerPolicy": "no-referrer-when-downgrade",
                    "body": `{\"title\":\"Scratch Image Uploader Autogenerated Project ${randomId}\"}`,
                    "method": "PUT",
                    "mode": "cors",
                    "credentials": "omit"
                }).then(thing=>{
                    console.log('changed title')
                    $.ajax({ //CREDIT TO WORLD LANGUAGES FOR THIS THING
                        type: "POST",
                        url: "/internalapi/project/thumbnail/" + data["content-name"] + "/set/",
                        data: image,
                        headers: {
                            "X-csrftoken": getCookie("scratchcsrftoken"),
                        },
                        contentType: "",
                        processData: false,
                        xhr: function() {
                            progresselement.innerHTML = "Uploading thumbnail... 0%";
                            var xhr = $.ajaxSettings.xhr();
                            xhr.upload.onprogress = function(e) {
                                if(true){
                                    var progress = Math.floor(e.loaded / e.total *100) + '%';
                                    progresselement.innerHTML = `Uploading thumbnail... ${progress}`;
                                }
                            };
                            return xhr;
                        },
                        error: function() {
                            textFieldEdit.insert(textBox,`your image could not be added. perhaps try a smaller one. here is a cat. [img]https://cdn2.scratch.mit.edu/get_image/project/413649276_9000x7200.png[/img]`);
                            
                            //delete the project anyways
                            progresselement.innerHTML = "Moving project to trash...";
                            fetch(`https://scratch.mit.edu/site-api/projects/all/${data["content-name"]}/`, {
                                "headers": {
                                    "accept": "application/json, text/javascript, */*; q=0.01",
                                    "accept-language": "en-US,en;q=0.9",
                                    "content-type": "application/json",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-csrftoken": getCookie('scratchcsrftoken'),
                                    "x-requested-with": "XMLHttpRequest"
                                },
                                "referrer": "https://scratch.mit.edu/mystuff/",
                                "referrerPolicy": "no-referrer-when-downgrade",
                                "body": `{\"view_count\":0,\"favorite_count\":0,\"remixers_count\":0,\"creator\":{\"username\":\"Scratch\",\"pk\":53088961,\"thumbnail_url\":\"//uploads.scratch.mit.edu/users/avatars/default.png\",\"admin\":false},\"title\":\"Scratch Image Uploader Autogenerated Project ${randomId}\",\"isPublished\":false,\"datetime_created\":\"2020-07-24T10:27:23\",\"thumbnail_url\":\"//uploads.scratch.mit.edu/projects/thumbnails/413641266.png\",\"visibility\":\"trshbyusr\",\"love_count\":0,\"datetime_modified\":\"2020-07-24T10:27:24\",\"uncached_thumbnail_url\":\"//cdn2.scratch.mit.edu/get_image/project/413641266_100x80.png\",\"thumbnail\":\"413641266.png\",\"datetime_shared\":null,\"commenters_count\":0,\"id\":413641266}`,
                                "method": "PUT",
                                "mode": "cors",
                                "credentials": "include"
                            }).then(asdf=>{
                                console.log('deleted project')
                                progresselement.remove()
                            })
                        
                        },
                        success: function(msg) {
                            console.log('set thumbnail')
                            textFieldEdit.insert(textBox,`[img]https://cdn2.scratch.mit.edu/get_image/project/${data["content-name"]}_9000x7200.png[/img]`)
                            progresselement.innerHTML = "Moving project to trash...";

                            fetch(`https://scratch.mit.edu/site-api/projects/all/${data["content-name"]}/`, {
                                "headers": {
                                    "accept": "application/json, text/javascript, */*; q=0.01",
                                    "accept-language": "en-US,en;q=0.9",
                                    "content-type": "application/json",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-csrftoken": getCookie('scratchcsrftoken'),
                                    "x-requested-with": "XMLHttpRequest"
                                },
                                "referrer": "https://scratch.mit.edu/mystuff/",
                                "referrerPolicy": "no-referrer-when-downgrade",
                                "body": `{\"view_count\":0,\"favorite_count\":0,\"remixers_count\":0,\"creator\":{\"username\":\"Scratch\",\"pk\":53088961,\"thumbnail_url\":\"//uploads.scratch.mit.edu/users/avatars/default.png\",\"admin\":false},\"title\":\"Scratch Image Uploader Autogenerated Project ${randomId}\",\"isPublished\":false,\"datetime_created\":\"2020-07-24T10:27:23\",\"thumbnail_url\":\"//uploads.scratch.mit.edu/projects/thumbnails/413641266.png\",\"visibility\":\"trshbyusr\",\"love_count\":0,\"datetime_modified\":\"2020-07-24T10:27:24\",\"uncached_thumbnail_url\":\"//cdn2.scratch.mit.edu/get_image/project/413641266_100x80.png\",\"thumbnail\":\"413641266.png\",\"datetime_shared\":null,\"commenters_count\":0,\"id\":413641266}`,
                                "method": "PUT",
                                "mode": "cors",
                                "credentials": "include"
                            }).then(asdf=>{
                                console.log('deleted project')
                                progresselement.remove()
                            })
                        },
                    });
                })
            })
        }))("then")


    }
})();