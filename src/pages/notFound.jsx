import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div style={style.cointainer}>
            <h1 style={style.title}>404</h1>
            <p style={style.message}>oops! The page you are looking for does not exist</p>
            <Link to='/' style={style.link}> Go back Home</Link>
        </div>
    );
}

const style = {

    cointainer: {
        textAlign: 'center',
        padding: '80px 20px',
        color: '#fff'
    },
    title: {
        fontSize: '72px',
        marginBottom: '20px'
    },
    message: {
        fontSize: '18px',
        marginBottom: '30px'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold'
    },

}

export default NotFoundPage;