import React, { useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  defaultValue,
  onSave,
  label,
  placeholder = 'write your Nickname',
  emptyMessage = 'nickName is empty',
  ...inputProps
}) => {
  const [newNickname, setNewnickname] = useState(defaultValue);
  const [isEditable, setisEditable] = useState(false);
  const onChangeNickname = value => {
    setNewnickname(value);
  };
  const onEdit = () => {
    setisEditable(c => !c);
    setNewnickname(defaultValue);
  };
  const onCheck = () => {
    const nickName = newNickname.trim();
    if (nickName === '') {
      Alert.info(emptyMessage, 4000);
    }
    if (nickName !== defaultValue) {
      onSave(nickName);
      setNewnickname(nickName);
    }
    setisEditable(false);
  };
  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={newNickname}
          onChange={onChangeNickname}
        />
        <InputGroup.Button onClick={onEdit}>
          <Icon icon={isEditable ? 'close' : 'edit'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onCheck}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
