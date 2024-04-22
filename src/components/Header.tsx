import Helmet from "react-helmet";

const Header = ({config, title, head, description}) => {
    return (
        <head>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="twitter:card" content="summary"/>
                <link rel="stylesheet" href={`${config.root}assets/index.css`}/>
            </Helmet>
            {head}
        </head>
    );
};

export default Header;