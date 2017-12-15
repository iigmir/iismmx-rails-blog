module ApplicationHelper
    def sns_link( sns_type )
        def sns_type_switch( sts_input )
            case sts_input
            when "firefox"
                return "https://developer.mozilla.org/zh-TW/profiles/"
            when "github"
                return "https://www.github.com/"
            when "codepen"
                return "https://codepen.io/"
            else
                return root_path
            end
        end
        account_name = "iigmir"
        website = sns_type_switch( sns_type ) + account_name

        link_to website, target: "_blank", title: sns_type do
            fa_icon sns_type
        end
    end

    def login_and_out()
        if user_signed_in?
            link_to destroy_user_session_path, method: :delete do
                fa_icon "sign-out"
            end
        else
            link_to new_user_session_path do
                fa_icon "sign-in"
            end
        end
    end
end
