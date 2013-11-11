(function($){
    var user_name = null,
        user_id = null,
        user_image = null,
        pendings = 0,
        active_window=null,
        users_store = {};


    function server_add_user(user){
        users_store[user.name] = user;
        update_user_status(user);
    }

    //DomEvents Handlers
    function bindDOMEvents(){
        $("#message").keypress(function(event){
            if(event.which == 13){
                var recipient = $("#user_list .selected").text().replace(/^\s*|\s*$/g, '');
                var text = $(this).val();
                send_private({sender:user_name, recipient: recipient, data: text});
            }
        });

        $("#user_list").on('click', '.user_name', function(){
            var recipient = $(this).text().replace(/^\s*|\s*$/g, '');
            prepare_window(recipient);
            $("#user_list .selected").removeClass("selected");
            $(this).addClass("selected");
            active_window = recipient;
        });

        $("#close_chat").click(function(){
            $("#user_list .selected").removeClass("selected");
            reset_chat_window("recipient");
            $("#chat").hide();
            active_window=null;
        });

        $("#user_list").on("click", ".pending_user", function(){
            $(this).removeClass("pending_user");

            if(!$(".pending_user").size())
                $("#pending_chats").hide();
        });

        $("#user_list_header").click(function(){
            if($(this).data("collapsed") == "collapsed"){
                 $(this).data("collapsed", "uncollapsed");                
                 $("#users_container").show();
            }else{
                $(this).data("collapsed", "collapsed");                
                $("#users_container").hide();
            }
        });

        $("#user_search").keyup(function(){
            var search_text = this.value.toLowerCase();

            if(search_text == "") {
                $(".user_name").slice(0,10).show();
            }
            else{
                if (event.keyCode == 8) {
                    $(".user_name").filter(function(){
                        var name = $("a", $(this)).text();
                        return name.toLowerCase().indexOf(search_text) != -1;
                    }).show();
                }
                else{
                    $(".user_name").filter(function(){
                        var name = $("a", $(this)).text();
                        return name.toLowerCase().indexOf(search_text) == -1;
                    }).hide();
                }
            }
        });
    }

    //Helpers
    function connect(user){
        user_name = user.name;
        user_id = user.id;
        user_image = user.image;
        users_store[user_name] = user;
    }

    function scroll_chat(){
        $('#messages').scrollTop($('#messages').get(0).scrollHeight);
    }

    function append_message(msg){
        $("#messageTemplate").tmpl({ data: msg.data, image: users_store[msg.sender].image }).appendTo("#messages");
        scroll_chat();
    }

    function send_private(message){
        $("#message").val("");
        append_message(message);
        scroll_chat();
        append_message({sender:message.recipient, recipient: message.sender, data: "Bien y vos?"});

    }

    function update_user_status(user){
        if(!$("#"+user.id).size())
            $("#userTemplate").tmpl({ id: user.id, name: user.name , image: user.image, status: user.status  }).appendTo("#users");
        else{
            $("#"+user.id +" .status").removeClass("disconnected");
            $("#"+user.id +" .status").addClass("connected");
        }
    }

    function reset_chat_window(user){
        $("#message").val("");
        $("#messages").html("");
    }

    function prepare_window(recipient){
        reset_chat_window(recipient);
        $("#chat #recipient_name").html(recipient);
        $("#chat").show();
    }

    function show_window(message){
        prepare_window(message.recipient);
    }

    function user_disconnected(user_id){
        $("#"+user_id+ " .connected").removeClass("connected");
    }

    //main
    $(function(){
        bindDOMEvents();
        connect({name: "Alfredo", id: 1, status: "connected", image:"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211590_642016669_1571759657_q.jpg"});
        server_add_user({name: "Pep", id: 2, status: "connected", image:"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s32x32/1117264_1095901190_72886247_q.jpg"});
        server_add_user({name: "Jose", id: 3, status: "connected", image:"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c65.65.811.811/s160x160/1149078_10152174496217785_959738206_n.jpg"});
        server_add_user({name: "Maria", id: 4, status: "disconnected", image:"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c2.0.160.160/p160x160/1119040_759256348_1382896056_n.jpg"});
        server_add_user({name: "Alejandra", id: 5, status: "disconnected", image:"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c33.33.413.413/s160x160/148305_10152444158125136_1231038963_n.jpg"});
    });
})(jQuery);