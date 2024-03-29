import { styled } from "styled-components";

export const FilterStyle = styled.div`
    display: flex;
    justify-content: center;

    .filter__input{
        width: 100%;
        max-width: 290px;
        padding: 0 10px;
        border: none;
        outline: none;
        margin-top: 5px;
        color: #f3f0f0;
        background-color: transparent;
        border: 1px solid #9B59B6;
        height: 30px;
        border-radius: 10px;
        padding: 0 10px;
        font-size: 15px;
        font-family: Georgia, 'Times New Roman', Times, serif;

        &::placeholder{
            color: #f3f0f0;
            font-size: 10px;
            font-family: Georgia, 'Times New Roman', Times, serif;
        }
    }
`