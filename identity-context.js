const React = require('react');
const netlifyIdentity = require('netlify-identity-widget');
const { useEffect, useState } = require('react');

const IdentityContext = React.createContext({});

exports.IdentityContext = IdentityContext;

const IdentityProvider = props => {
    const [user, setUser] = useState('');

    useEffect(() => {
        netlifyIdentity.init({});
    }, []);

    //event handler for login and logout user
    netlifyIdentity.on("login", user => {
        netlifyIdentity.close();
        setUser(user);
    });

    netlifyIdentity.on("logout", () => {
        netlifyIdentity.close();
        setUser();
    });

    return (
        <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
            {props.children}
        </IdentityContext.Provider>
    )
};

exports.Provider = IdentityProvider;