function Tooltip({ message, style }) {
    return (
        <div className="tooltip" style={style}>
            <p className="overflow-hidden">{message}</p>
        </div>
    );
}

export default Tooltip;
