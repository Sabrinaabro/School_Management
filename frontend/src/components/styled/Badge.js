import styled from "styled-components";
import { Badge } from "antd";

// Please use this badge whereever you want in the app.
export const TableBadge = styled(Badge.Ribbon)`
    .ant-badge-ribbon {
        color: #fff;
        font-weight: bold;
        margin: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

// Use this method to create styled components in the app.
