import React from 'react'
import AppleLogin from 'react-apple-login'

var setting = {
    clientId: 'com.react.apple.login',
    redirectURI: 'https://redirectUrl.com',
    scope: '',
    state: '',
    responseType: 'code',
    responseMode: 'query',
    nonce: '',
    usePopup: false,
    designProp: {
      height: 45,
      width: 160,
      color: 'black',
      border: false,
      type: 'sign-in',
      border_radius: 15,
      scale: 1,
      locale: 'en_US',
    }
  }

const AppleSignIn = () => {
    return (
        <div>
            <AppleLogin {...setting} />
        </div>
    )
}

export default AppleSignIn
