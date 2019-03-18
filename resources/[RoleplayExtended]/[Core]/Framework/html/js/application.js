$(function() {
    var currentMenu = []
    var currentDialog = []
    var currentMenuItem = 0
    var func = this

    window.PushPipe = function(event, data) {
        const pipe = {
            __event: event,
            __data: data
        }

        $.post("http://nuipipe/__piperesponse", JSON.stringify(pipe))
    }
    
    window.addEventListener('message', (event) => {
        if(event.data.action == "notification") {
            this.showNotification(event.data.title, event.data.message, event.data.duration);
        } else if(event.data.action == "closeAllInstances") {
            $('.menu').remove()
            $('.dialog').remove()
        } else if(event.data.event == "menu") {
            if(event.data.action == "open") {
                currentMenuItem = 0
                currentMenu = event.data.menuSettings

                this.showMenu(currentMenu)
            } else if(event.data.action == "update") {
                currentMenu = event.data.menuSettings

                this.showMenu(currentMenu)
            } else if(event.data.action == "close") {
                if(currentMenu != null) {
                    var menu = currentMenu

                    $('.menu').css("left", "-50%")
                
                    setTimeout(function() {
                        if(currentMenu == menu) {
                            $('.menu').remove()
                        }
                    }, 500)
                }

                currentMenu = null
                currentMenuItem = 0
            } else if(event.data.action == "keyinput") {
                if(currentMenu != null != null && currentMenu.elements != null && currentMenu.elements.length > 0) {
                    if(event.data.key == "UP") {
                        if(currentMenuItem > 0) {
                            currentMenuItem--
                        }
                    } else if(event.data.key == "DOWN") {
                        if(currentMenuItem != currentMenu.elements.length - 1) {
                            currentMenuItem++
                        }
                    }

                    PushPipe("Framework:nui:updateMenuItem", currentMenu.elements[currentMenuItem])

                    this.showMenu(currentMenu)
                }
            }
        } else if(event.data.event == "character_creation") {
            $('#character-creation').html('<svg version="1.1" id="character-logo" viewBox="0 0 175.621 186.5" enable-background="new 0 0 175.621 186.5" style="transform: rotate(0deg) scale(1, 1); opacity: 1; position: absolute; backface-visibility: hidden; overflow: visible;"><defs class="defs"></defs><path fill="rgba(69, 161, 255, 0.3)" d="M175.56,11.832c-0.062-2.192-0.131-4.271-0.316-6.627L174.834,0l-5.201,0.048l-19.836,0.185L129.96,0.586c-6.611,0.139-13.225,0.195-19.836,0.4L90.287,1.573c-3.307,0.11-6.612,0.169-9.917,0.322l-9.918,0.407c-6.612,0.28-13.225,0.51-19.837,0.888c-6.612,0.355-13.224,0.655-19.836,1.107c-6.612,0.402-13.224,0.853-19.837,1.405C17.555,6.25,24.167,6.7,30.778,7.101c6.612,0.449,13.225,0.746,19.836,1.101c6.613,0.375,13.226,0.604,19.838,0.882l9.918,0.403c3.306,0.151,6.612,0.208,9.918,0.318l19.837,0.581c6.611,0.199,13.225,0.256,19.836,0.392l19.837,0.35l14.444,0.13c0.007,0.276,0.014,0.555,0.02,0.826c0.034,2.029,0.049,4.065,0.012,6.106c-0.051,4.079-0.246,8.165-0.487,12.248c-0.281,4.081-0.606,8.162-1.104,12.224c-0.473,4.064-1.045,8.115-1.701,12.152c-0.688,4.03-1.438,8.052-2.356,12.03c-0.435,1.997-0.882,3.99-1.399,5.964l-0.746,2.971l-0.836,2.943c-0.531,1.972-1.138,3.92-1.767,5.859c-0.58,1.958-1.246,3.883-1.924,5.807c-0.644,1.937-1.378,3.835-2.122,5.733c-0.703,1.914-1.521,3.779-2.313,5.656l-1.193,2.816l-1.293,2.768l-1.295,2.771l-1.405,2.713l-1.406,2.717l-1.513,2.656c-1.007,1.762-2.005,3.531-3.125,5.221c-14.835-6.139-26.863-15.906-28.626-28.324c-0.704-4.974-0.12-9.13,1.254-12.632c-2.071,3.738-4.047,8.523-5.517,14.626c-5.641,23.473,6.203,38.023,6.203,38.023s-6.267-2.791-9.365-11.229c-3.102-8.439-2.778-18.715-2.778-18.715s-3.427,5.523-2.396,22.396c0.814,13.268,12.403,29.16,17.427,35.152c-3.103-1.73-8.441-5.26-14.259-11.678c-9.041-9.984-10.853-22.82-10.853-22.82c-3.102,8.082-1.293,19.73-1.293,19.73c-16.282-19.021-9.305-40.408-9.305-40.408c-9.817,11.645-7.751,28.76-7.751,28.76s-6.979-7.131-3.099-25.666c3.872-18.54,20.154-29.474,20.154-29.474c14.608-9.251,34.426-11.434,40.348-15.247c1.869-1.204,5.039-6.231,5.381-8.777c0,0,6.119-1.549,10.396-6.797c2.214-2.716,2.128-8.403,1.438-10.988c0.326-0.904,0.382-3.211-0.564-3.932c-1.195-0.912-5.938,0.734-5.938,0.734l-20.973,2.385c0,0-10.154-3.791-19.064-5.359c-13.405-2.362-36.514,6.822-36.514,6.822c1.997,2.359,6.562,4.983,6.562,4.983c-18.825-6.035-23.392-23.872-23.392-23.872c-12.701,20.352-5.132,35.941-5.132,35.941C24.369,78.061,25.227,97.479,25.227,97.479c4.277-10.494,15.689-18.891,15.689-18.891c-10.234,11.941-12.518,26.797-11.749,38.442c-1.303-2.047-2.505-4.172-3.78-6.266c-1.443-2.713-2.994-5.389-4.307-8.189c-2.774-5.529-5.177-11.256-7.295-16.994c-2.147-5.729-3.933-11.499-5.449-17.145c-1.538-5.641-2.773-11.172-3.753-16.457c-0.996-5.281-1.766-10.315-2.319-14.981C1.12,27.665,0.74,19.812,0.629,14.317C0.524,8.819,0.699,5.674,0.699,5.674s-0.35,3.129-0.559,8.638c-0.2,5.505-0.266,13.396,0.351,22.849c0.289,4.727,0.779,9.841,1.482,15.231c0.688,5.394,1.621,11.065,2.857,16.881c1.215,5.823,2.7,11.804,4.565,17.789c1.834,5.993,3.969,12.018,6.509,17.889c1.195,2.967,2.638,5.83,3.979,8.73c1.5,2.816,2.882,5.693,4.521,8.402c3.09,5.535,6.633,10.682,10.236,15.576c0.952,1.209,1.896,2.406,2.833,3.594c0.47,0.588,0.934,1.201,1.403,1.762c0.472,0.539,0.941,1.074,1.408,1.609c0.933,1.068,1.856,2.125,2.768,3.172l0.419,0.475l0.362,0.379l0.723,0.756c0.481,0.504,0.957,1.004,1.431,1.5c0.903,0.932,1.781,1.863,2.652,2.781c10.189,11.385,22.528,22.541,37.44,32.813c10.411-7.168,19.528-14.703,27.553-22.438c0.098,0.109,22.79-25.264,30.418-37.699c0.865-1.24,1.705-2.496,2.532-3.764l1.763-2.709l1.654-2.777l1.654-2.781l1.541-2.842l1.539-2.846l1.438-2.896c0.971-1.928,1.883-3.881,2.723-5.865c0.871-1.973,1.731-3.947,2.496-5.961c0.801-2,1.59-4.006,2.287-6.043c0.728-2.027,1.426-4.064,2.051-6.123l0.973-3.079l0.882-3.103c0.606-2.065,1.146-4.146,1.662-6.234c1.041-4.173,1.907-8.382,2.706-12.604c0.39-2.11,0.732-4.229,1.085-6.35c0.295-2.125,0.633-4.248,0.866-6.381c0.547-4.259,0.916-8.536,1.236-12.817c0.305-4.283,0.434-8.579,0.476-12.884C175.638,16.151,175.608,13.994,175.56,11.832z M84.56,41.615c2.888-0.745,9.975,1.773,12.783,2.847l-21.773,4.611C75.569,49.073,77.687,43.388,84.56,41.615z M45.477,41.599c3.424,2.885,13.98,6.294,13.98,6.294c-5.977,3.489-12.553,10.232-12.553,10.232C43.858,51.498,45.477,41.599,45.477,41.599z"></path></svg><div id="character-forms"><br><br><input id="character-form-firstname" class="character-form" type="text" placeholder="Förnamn"><br><input id="character-form-lastname" class="character-form" type="text" placeholder="Efternamn"><br><input id="character-form-dob" class="character-form" type="text" placeholder="Födelsedatum (MM/DD/ÅÅÅÅ)"><br><button id="character-submit" class="character-button" type="submit" style="margin-left: 58px; margin-top: 10px; margin-bottom: 10px">Skapa</button></div>')
            $('#character-submit').click(function() {
                func.ResetPage()

                PushPipe("Framework:nui:characterCreated", {
                    firstname: $('#character-form-firstname').val(),
                    lastname: $('#character-form-lastname').val(),
                    dateofbirth: $('#character-form-dob').val()
                })
            })

            $('#character-overlay').css("display", "block")
            $('#character-creation').css("display", "block")
            $('#character-logo').css("display", "block")
        } else if(event.data.event == "character_selection") {
            var characters = JSON.parse(event.data.characters)
            var html = ""

            for(var i=0; i < characters.length; i++) {
                var character = characters[i]

                html += '<li class="character" data-character="' + character.id + '"><p class="character-name"><span style="font-weight: bold">' + character.firstname + '</span> ' + character.lastname + '</p><p class="character-info">' + character.dateofbirth + '</p><button class="character-button" type="submit" style="margin-left: 8px; padding: 10px 20px 10px 20px; font-size: 19px">Välj</button><br><button class="character-button" type="submit" style="margin-left: 8px; padding: 10px 20px 10px 20px; font-size: 19px">Ta bort</button></li>'
            }

            $('#character-overlay').css("display", "block")
            $('#character-selection').css("display", "block")
            $('#character-logo').css("display", "block")
            $('#characters').html(html)

            $('.character-button').click(function(event) {
                if($(this).text() == "Ta bort") {
                    var character = []

                    for(var i=0; i < characters.length; i++) {
                        if(characters[i].id == $(this).parent().data("character")) {
                            character = characters[i]
                        }
                    }

                    func.ResetPage()

                    $('#character-overlay').css("display", "block")
                    $('#character-remove').css("display", "block")
                    $('#character-logo').css("display", "block")
                    $('#character-remove-title').text('Vill du ta bort ' + character.firstname + ' ' + character.lastname + '?')
                    $('.character-remove-buttons').click(function() {
                        if($(this).text() == "Ta bort") {
                            PushPipe("Framework:nui:characterDeleted", {
                                id: character.id
                            })

                            $('#character-remove').css("display", "none")
                        } else if($(this).text() == "Avbryt") {
                            func.ResetPage()
                            
                            $('#character-overlay').css("display", "block")
                            $('#character-selection').css("display", "block")
                            $('#character-logo').css("display", "block")
                        }
                    })
                } else if($(this).text() == "Välj") {
                    func.ResetPage()

                    PushPipe("Framework:nui:characterSelected", {
                        id: $(this).parent().data("character")
                    })
                }
            })
        } else if(event.data.event == "dialog") {
            if(event.data.action == "open") {
                currentDialog = event.data.dialogSettings

                this.showDialog(currentDialog)
            } else if(event.data.action == "close") {
                if(currentDialog != null) {
                    var dialog = currentDialog

                    $('.dialog').css("left", "-50%")
                
                    setTimeout(function() {
                        if(currentDialog == dialog) {
                            $('.dialog').remove()
                        }
                    }, 500)
                }

                currentDialog = null
            }
        }
    });

    $('#character-create-extra').click(function() {
        func.ResetPage()

        $('#character-overlay').css("display", "block")
        $('#character-creation').css("display", "block")
        $('#character-logo').css("display", "block")
        $('#character-submit').click(function() {
            func.ResetPage()
            
            PushPipe("Framework:nui:characterCreated", {
                firstname: $('#character-form-firstname').val(),
                lastname: $('#character-form-lastname').val(),
                dateofbirth: $('#character-form-dob').val()
            })
        })
        $('#character-cancel-creation').click(function() {
            func.ResetPage()
    
            $('#character-overlay').css("display", "block")
            $('#character-selection').css("display", "block")
            $('#character-logo').css("display", "block")
        })
    })

    var menuElement = document.getElementById("menu")

    this.showMenu = function(settings) {
        var items = ''

        if(settings != null && settings.elements != null) {
            for(var i=0; i < settings.elements.length; i++) {
                var item = settings.elements[i]
                var index = 0

                while(i >= (index + 9)) {
                    index += 9
                }

                if(currentMenuItem >= index && currentMenuItem < (index + 9)) {
                    var addon = ""
                    var httpIcon = "https://png.icons8.com/ios/30/3776b6/"
                    var pngIcon = ".png"

                    if(item.display != null) {
                        addon = '<p class="menu-display">' + item.display + '</p>'
                    }

                    if(i == currentMenuItem) {
                        items += '<li><div class="menu-item-selected" data-value=\"' + item.value + '\" data-label=\"' + item.label + '\"><img src="' + httpIcon + item.icon + pngIcon + '"><p class="menu-text">' + item.label + '</p>' + addon + '</div></li>'
                    } else {
                        items += '<li><div class="menu-item" data-value=\"' + item.value + '\" data-label=\"' + item.label + '\"><img src="' + httpIcon + item.icon + pngIcon + '"><p class="menu-text">' + item.label + '</p>' + addon + '</div></li>'
                    }
                }
            }
        }
    
        var menu = '<div class="menu"><svg version="1.1" id="unity_logo" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 175.621 186.5" enable-background="new 0 0 175.621 186.5" style="transform: rotate(0deg) scale(1, 1); opacity: 1; position: absolute; backface-visibility: hidden; left: 5px; top: 10px; width: 110px; height: 110px; overflow: visible;"><defs class="defs"></defs><path fill="#3776b6" d="M175.56,11.832c-0.062-2.192-0.131-4.271-0.316-6.627L174.834,0l-5.201,0.048l-19.836,0.185L129.96,0.586c-6.611,0.139-13.225,0.195-19.836,0.4L90.287,1.573c-3.307,0.11-6.612,0.169-9.917,0.322l-9.918,0.407c-6.612,0.28-13.225,0.51-19.837,0.888c-6.612,0.355-13.224,0.655-19.836,1.107c-6.612,0.402-13.224,0.853-19.837,1.405C17.555,6.25,24.167,6.7,30.778,7.101c6.612,0.449,13.225,0.746,19.836,1.101c6.613,0.375,13.226,0.604,19.838,0.882l9.918,0.403c3.306,0.151,6.612,0.208,9.918,0.318l19.837,0.581c6.611,0.199,13.225,0.256,19.836,0.392l19.837,0.35l14.444,0.13c0.007,0.276,0.014,0.555,0.02,0.826c0.034,2.029,0.049,4.065,0.012,6.106c-0.051,4.079-0.246,8.165-0.487,12.248c-0.281,4.081-0.606,8.162-1.104,12.224c-0.473,4.064-1.045,8.115-1.701,12.152c-0.688,4.03-1.438,8.052-2.356,12.03c-0.435,1.997-0.882,3.99-1.399,5.964l-0.746,2.971l-0.836,2.943c-0.531,1.972-1.138,3.92-1.767,5.859c-0.58,1.958-1.246,3.883-1.924,5.807c-0.644,1.937-1.378,3.835-2.122,5.733c-0.703,1.914-1.521,3.779-2.313,5.656l-1.193,2.816l-1.293,2.768l-1.295,2.771l-1.405,2.713l-1.406,2.717l-1.513,2.656c-1.007,1.762-2.005,3.531-3.125,5.221c-14.835-6.139-26.863-15.906-28.626-28.324c-0.704-4.974-0.12-9.13,1.254-12.632c-2.071,3.738-4.047,8.523-5.517,14.626c-5.641,23.473,6.203,38.023,6.203,38.023s-6.267-2.791-9.365-11.229c-3.102-8.439-2.778-18.715-2.778-18.715s-3.427,5.523-2.396,22.396c0.814,13.268,12.403,29.16,17.427,35.152c-3.103-1.73-8.441-5.26-14.259-11.678c-9.041-9.984-10.853-22.82-10.853-22.82c-3.102,8.082-1.293,19.73-1.293,19.73c-16.282-19.021-9.305-40.408-9.305-40.408c-9.817,11.645-7.751,28.76-7.751,28.76s-6.979-7.131-3.099-25.666c3.872-18.54,20.154-29.474,20.154-29.474c14.608-9.251,34.426-11.434,40.348-15.247c1.869-1.204,5.039-6.231,5.381-8.777c0,0,6.119-1.549,10.396-6.797c2.214-2.716,2.128-8.403,1.438-10.988c0.326-0.904,0.382-3.211-0.564-3.932c-1.195-0.912-5.938,0.734-5.938,0.734l-20.973,2.385c0,0-10.154-3.791-19.064-5.359c-13.405-2.362-36.514,6.822-36.514,6.822c1.997,2.359,6.562,4.983,6.562,4.983c-18.825-6.035-23.392-23.872-23.392-23.872c-12.701,20.352-5.132,35.941-5.132,35.941C24.369,78.061,25.227,97.479,25.227,97.479c4.277-10.494,15.689-18.891,15.689-18.891c-10.234,11.941-12.518,26.797-11.749,38.442c-1.303-2.047-2.505-4.172-3.78-6.266c-1.443-2.713-2.994-5.389-4.307-8.189c-2.774-5.529-5.177-11.256-7.295-16.994c-2.147-5.729-3.933-11.499-5.449-17.145c-1.538-5.641-2.773-11.172-3.753-16.457c-0.996-5.281-1.766-10.315-2.319-14.981C1.12,27.665,0.74,19.812,0.629,14.317C0.524,8.819,0.699,5.674,0.699,5.674s-0.35,3.129-0.559,8.638c-0.2,5.505-0.266,13.396,0.351,22.849c0.289,4.727,0.779,9.841,1.482,15.231c0.688,5.394,1.621,11.065,2.857,16.881c1.215,5.823,2.7,11.804,4.565,17.789c1.834,5.993,3.969,12.018,6.509,17.889c1.195,2.967,2.638,5.83,3.979,8.73c1.5,2.816,2.882,5.693,4.521,8.402c3.09,5.535,6.633,10.682,10.236,15.576c0.952,1.209,1.896,2.406,2.833,3.594c0.47,0.588,0.934,1.201,1.403,1.762c0.472,0.539,0.941,1.074,1.408,1.609c0.933,1.068,1.856,2.125,2.768,3.172l0.419,0.475l0.362,0.379l0.723,0.756c0.481,0.504,0.957,1.004,1.431,1.5c0.903,0.932,1.781,1.863,2.652,2.781c10.189,11.385,22.528,22.541,37.44,32.813c10.411-7.168,19.528-14.703,27.553-22.438c0.098,0.109,22.79-25.264,30.418-37.699c0.865-1.24,1.705-2.496,2.532-3.764l1.763-2.709l1.654-2.777l1.654-2.781l1.541-2.842l1.539-2.846l1.438-2.896c0.971-1.928,1.883-3.881,2.723-5.865c0.871-1.973,1.731-3.947,2.496-5.961c0.801-2,1.59-4.006,2.287-6.043c0.728-2.027,1.426-4.064,2.051-6.123l0.973-3.079l0.882-3.103c0.606-2.065,1.146-4.146,1.662-6.234c1.041-4.173,1.907-8.382,2.706-12.604c0.39-2.11,0.732-4.229,1.085-6.35c0.295-2.125,0.633-4.248,0.866-6.381c0.547-4.259,0.916-8.536,1.236-12.817c0.305-4.283,0.434-8.579,0.476-12.884C175.638,16.151,175.608,13.994,175.56,11.832z M84.56,41.615c2.888-0.745,9.975,1.773,12.783,2.847l-21.773,4.611C75.569,49.073,77.687,43.388,84.56,41.615z M45.477,41.599c3.424,2.885,13.98,6.294,13.98,6.294c-5.977,3.489-12.553,10.232-12.553,10.232C43.858,51.498,45.477,41.599,45.477,41.599z"></path></svg><p class="title">' + settings.title + '</p><hr><ul>' + items + '</ul></div>'
    
        menuElement.innerHTML = menu
    }

    this.showNotification = function(title, message, duration) {
        $('#notification').html('<h1>' + title + '</h1><hr><p>' + message + '<p><div id="notification-bar"></div>')
        $('#notification').css("display", "block").css("width", "20%").css("width", "20%").animate({left: "-7px"}, 500)
        $('#notification-bar').css("width", "100%").css("transition", "width " + (duration / 1000) + "s").css("width", "0%")
        $('#notification-bar').one('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function() {
            $('#notification').animate({left: "-25%"}, 500, null, function() {
                $('#notification').html("")
                $('#notification').css("display", "none").css("width", "20%")
                $('#notification-bar').css("width", "100%")
    
                PushPipe("Framework:nui:notificationDisplayed")
            })
        })
    }

    this.showDialog = function(settings) {
        $('.dialog').remove()

        var dialog = '<div class="dialog"><p class="title">' + settings.title + '</p><hr><br><input id="dialog-form" class="character-form" type="text" placeholder=' + settings.placeholder + '><br><br><button id="dialog-form-submit" class="character-button" type="submit">' + settings.submit + '</button><button id="dialog-form-cancel" class="character-button" type="submit">' + settings.cancel + '</button>'

        $(document.body).append(dialog);
        $("#dialog-form-submit").unbind("click");
        $('#dialog-form-submit').click(function() {
            PushPipe("Framework:nui:dialogSubmit", {
                input: $('#dialog-form').val()
            })
        });
        $("#dialog-form-cancel").unbind("click");
        $('#dialog-form-cancel').click(function() {
            PushPipe("Framework:nui:dialogCancel", {dummy: 'dummy'})
        })
    }

    this.ResetPage = function() {
        $('#character-overlay').css("display", "none")
        $('#character-selection').css("display", "none")
        $('#character-creation').css("display", "none")
        $('#character-remove').css("display", "none")
        $('#character-logo').css("display", "none")
    }
})