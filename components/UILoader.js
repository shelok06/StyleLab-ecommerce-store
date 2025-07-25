import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .jimu-primary-loading:before,
  .jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: '';
  }

  .jimu-primary-loading:before {
    left: -19.992px;
  }

  .jimu-primary-loading:after {
    left: 19.992px;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }

  .jimu-primary-loading:before,
  .jimu-primary-loading:after,
  .jimu-primary-loading {
    background: #b6b8ba;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
  }

  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 6.8px);
    top: calc(50% - 16px);
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }

  @-webkit-keyframes loading-keys-app-loading {

    0%,
    80%,
    100% {
      opacity: .75;
      box-shadow: 0 0 #b6b8ba;
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px #b6b8ba;
      height: 40px;
    }
  }

  @keyframes loading-keys-app-loading {

    0%,
    80%,
    100% {
      opacity: .75;
      box-shadow: 0 0 #b6b8ba;
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px #b6b8ba;
      height: 40px;
    }
  }`;

const UILoader = () => {
    return (
        <StyledWrapper className='flex justify-center items-center transition-all'>
            <div className="loader">
                <div className="justify-content-center jimu-primary-loading" />
            </div>
        </StyledWrapper>
    );
}


export default UILoader;
