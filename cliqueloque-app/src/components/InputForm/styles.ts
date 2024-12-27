import styled from "styled-components";

export const InputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    display: block;
  }

  input {
    width: 100%;
    padding: 4px 16px;
    display: block;
    border: 1px solid #aaa;
    border-radius: 4px;

    &.is-error {
      color: red;
      outline-color: red;
      border: 1px solid red;

      &:focus {
        outline-color: red;
      }
    }

    &:focus {
      outline-color: #00f8;
    }
  }

  span {
    color: red;
    font-size: 14px;
    font-weight: 300;
  }
`;
