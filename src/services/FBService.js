import constants from '../constants';


export const FBInit = () => {
    return new Promise((resolve) => {
        if (typeof FB !== 'undefined') {
            resolve();
        } else {
            window.fbAsyncInit = () => {
                FB.init({
                    appId: constants.appId,
                    cookie: true,
                    xfbml: true,
                    version: constants.appVer
                });
                resolve();
            };
            (function(d, s, id) {
                const fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                const js = d.createElement(s); js.id = id;
                js.src = '//connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    });
};

const prepareQuery = (query, method = '') => `${method}?access_token=${constants.appId}${query}`;

export const FBQuery = (query, method) => {
    return new Promise((resolve, reject) => {
        FB.api(
            prepareQuery(query, method),
            response => response.error ? reject(response) : resolve(response)
        );
    });
};

export default (query, method) => {
    return FBInit()
        .then(() => FBQuery(query, method));
        //.catch(error => console.warn(error));
};
