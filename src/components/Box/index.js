import styled from 'styled-components';

const Box = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  border: solid 1px #d1d5da;
  
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input, textarea {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  textarea {
    border-radius: 8px;
    @media(min-width: 860px) {
      height: 100px;
    }
  }
  label {
    font-size: 12px;
    padding: 0 0 4px 16px;
    display: inline-block;
    line-height: 16px;
    span {
      font-size: 14px;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #6F92BB;
    margin: 0 8px 8px 0;    
  }
  button.link {
    background-color: #D9E6F6;
    padding: 9px 12px;
    color: #2E7BB4;
    border-radius: 8px;
  }
  button.action {
    background-color: #6F92BB;
    color: #fff;
  }
  button.add {
    background-color: #2ea44f;
  }
  ul.list-commits {
    background-color: #D9E6F6;
    font-size: 13px;
    line-height: 17px;
  }
  ul.list-commits li {
    list-style: none;
    padding: 11px;
  }
  ul.list-commits li:nth-child(even){
    background-color: #F1F9FE;
  }
  ul.list-commits li h4 {
    color: #2E7BB4;
    font-size: 18px;
    font-weight: lighter;
    line-height: 21px;
  }
  div.rowInputs{
    @media(min-width: 860px) {
      display: flex;
      justify-content: space-between;
      input {
        width: 49%;
      }
    }
  }
`; 

export default Box