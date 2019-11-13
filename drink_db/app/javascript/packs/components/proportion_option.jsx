import React from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import { FormGroup, Label, Input, Col, Badge, InputGroup, InputGroupAddon } from 'reactstrap'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'

const DragHandle = sortableHandle(() => <Badge className="drag-handle">::</Badge>)

function ProportionOption({ updateProportion, proportion: { bottle: { content, id }, amount } }) {
  const active = amount > 0
  const inactive = !active
  return (
    <FormGroup row className={classnames({ 'proportion-inactive': inactive })}>
      <Col xs={1}>
        <DragHandle />
      </Col>
      <Label className="text-right" xs={4}>{content}</Label>
      <Col xs={7}>
        <InputGroup>
          <Input type="text" name="amount" value={amount} type="number" step="1" onChange={({ target: { value } }) => updateProportion(id, value)} />
          <InputGroupAddon addonType="append">ml.</InputGroupAddon>
        </InputGroup>
      </Col>
    </FormGroup>
  )
}

const ObservedProportionOption = inject(({ recipes: { updateProportion } }) => ({
  updateProportion
}))(observer(ProportionOption))

export default SortableElement((props) => <ObservedProportionOption {...props} /> )
