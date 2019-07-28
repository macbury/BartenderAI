import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap'
import { ChromePicker } from 'react-color'

function BottleForm({ bottle, onChange, onSubmit, errors, onRefill }) {
  const update = ({ target: { name, value } }) => {
    onChange(name, value)
  }

  const updateInt = ({ target: { name, value } }) => {
    onChange(name, parseInt(value) || 0)
  }

  const updateFloat = ({ target: { name, value } }) => {
    onChange(name, parseFloat(value) || 0.0)
  }

  const updateColor = ({ hex }) => {
    onChange('color', hex)
  }

  const { content, color, size, flowRate, startupDelay } = bottle
  const hasErrors = errors && errors.length > 0

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input type="text" invalid={hasErrors} name="content" id="content" value={content} bsSize="lg" onChange={update} />
        {hasErrors && <FormFeedback>{errors.join(', ')}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="color">Color</Label>
        <ChromePicker color={color} onChange={updateColor} />
      </FormGroup>
      <FormGroup>
        <Label for="size">Size(ml)</Label>
        <Input type="number" name="size" id="size" value={size} bsSize="lg" onChange={updateInt} />
      </FormGroup>
      <FormGroup>
        <Label for="flowRate">Flow rate(ml)</Label>
        <Input type="number" name="flowRate" id="flowRate" value={flowRate} bsSize="lg" onChange={updateInt} />
      </FormGroup>
      <FormGroup>
        <Label for="startupDelay">Startup delay(sec)</Label>
        <Input type="number" name="startupDelay" id="startupDelay" value={startupDelay} bsSize="lg" onChange={updateFloat} />
      </FormGroup>
      <div>
        <Button color="primary" size="lg">Save</Button>{' '}
        <Link to="/bottles" className="btn btn-secondary btn-lg">Cancel</Link>{' '}
        <Button outline color="warning" size="lg" onClick={() => onRefill()}>Refill</Button>
      </div>
    </Form>
  )
}

export default observer(BottleForm)