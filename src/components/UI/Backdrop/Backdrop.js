import classes from './Backdrop.module.scss';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

export default Backdrop;
