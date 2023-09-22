
  const RadioCheckBox = ({
    className,
    onChange,
    list,
  }) => {
    return (
      <>
        {list &&
          list.length > 0 &&
          list.map((ele, index) => {
            console.log("checked", ele?.checked);
            console.log("value", ele?.value);
            return (
              <div className="form-check form-check-inline ms-2" key={ele.index}>
                <input
                  className={`form-check-input ${className}`}
                  type="checkbox"
                  name={ele?.name}
                  id={ele?.id}
                  value={ele?.value}
                  onChange={onChange}
                  checked={ele?.checked == ele?.value}
                />
                <label className="form-check-label" htmlFor={ele?.id}>
                  {ele?.labelText}
                </label>
              </div>
            );
          })}
      </>
    );
  };
  
  export default RadioCheckBox;
  