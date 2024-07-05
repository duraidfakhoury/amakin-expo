import "./footer.css"

const Footer = (props) => {
    return <div className="footer">
        <span>AMAKIN EXPO</span>
        <span>{props.data}</span>
    </div>
}

export default Footer ;