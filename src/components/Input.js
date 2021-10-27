import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="pt-0">
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        step={props.step}
        ref={ref}
        name={props.name}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        className="px-1 py-1 placeholder-black text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      />
    </div>
  );
});

export default Input;
