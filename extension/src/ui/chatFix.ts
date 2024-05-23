export const _before950 = `@media (max-width: 950px) {
    section[class*="live_container"] {
        flex-direction: column! important;
        width: calc(100vw - 78px)! important;
        overflow: hidden! important;
        box-sizing: border-box! important;
    }

    section[class*="live_container"][class*="live_is_large"] {
        width: 100vw! important;
    }

    main[class*="live_information_container"] {
        height: fit-content! important;
        overflow-y: initial! important;
    }

    div[class*="live_information_contents"] {
        height: fit-content! important;
        max-height: unset! important;
    }

    aside[class*="live_chatting_container"] {
        width: 100%! important;
        flex: 1! important;
        display: flex! important;
        flex-direction: column! important;
        height: 100%! important;
        overflow: hidden! important;
    }

    div[class*="live_chatting_header_container"], div[class*="live_information_footer"], div[class*="video_information_live_data"] {
        display: none! important;
    }

    div[class*="live_chatting_list_container"][role="log"] {
        padding-top: 0px! important;
        height: 100%! important;
        overflow: hidden! important;
    }

    div[class*="live_information_details"] {
        padding: 12px 18px 12px;
    }

    div[class*="video_information_row"]:last-child {
        margin-top: 5px! important;
    }
}`;
