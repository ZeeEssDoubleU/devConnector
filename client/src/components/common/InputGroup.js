import React from "react";
import PropTypes from "prop-types";

const InputGroup = (props) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={props.icon} />
				</span>
			</div>
			<input
				className={"form-control form-control-lg" + (props.error ? " is-invalid" : "")}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
			{props.error && <div className="invalid-feedback">{props.error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
	type: "text",
};

export default InputGroup;
