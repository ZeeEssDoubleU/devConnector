import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = (props) => {
	return (
		<div className="form-group">
			<input
				type={props.type}
				className={"form-control form-control-lg" + (props.error ? " is-invalid" : "")}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				disabled={props.disabled}
			/>
			{props.info && <small className="form-text text-muted">{props.info}</small>}
			{props.error && <div className="invalid-feedback">{props.error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

TextFieldGroup.defaultProps = {
	type: "text",
};

export default TextFieldGroup;
