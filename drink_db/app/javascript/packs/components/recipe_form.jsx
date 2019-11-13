import React from 'react'
import { observer } from 'mobx-react'
import { SortableContainer } from 'react-sortable-hoc'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap'
import ProportionOption from './proportion_option'

const ProportionsList = SortableContainer(({proportions}) => {
  return (
    <div className="proportions-sorter">
      {proportions.map((proportion, index) => (
        <ProportionOption key={`item-${index}`} index={proportion.position} proportion={proportion} />
      ))}
    </div>
  );
});


function RecipeForm({ 
  recipe, 
  onNameChange, 
  onPriceChange,
  onMove, 
  onSubmit, 
  errors,
  onMakeADrink,
  onDestroy
}) {
  const { id, name, proportions, price: { value, currency } } = recipe
  const hasErrors = errors && errors.length > 0
  const newRecord = !id

  const onSortEnd = ({oldIndex, newIndex}) => {
    onMove(oldIndex, newIndex)
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" invalid={hasErrors} name="name" id="name" value={name} bsSize="lg" onChange={({ target: { name, value } }) => onNameChange(name, value)} />
        {hasErrors && <FormFeedback>{errors.join(', ')}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <InputGroup>
          <Input type="text" name="price" value={value} type="number" step="0.01" bsSize="lg" onChange={({ target: { value } }) => onPriceChange(value)} />
          <InputGroupAddon addonType="append">{currency}</InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <ProportionsList proportions={proportions}
                       lockAxis="y"
                       useDragHandle
                       onSortEnd={onSortEnd} />
      <div>
        <Button color="primary" size="lg">Save</Button>{' '}
        <Link to="/recipes" className="btn btn-secondary btn-lg">Cancel</Link>{' '}

        {onDestroy && <Button outline color="danger" size="lg" onClick={onDestroy}>Delete</Button>}{' '}
        {onMakeADrink && <Button outline color="warning" size="lg" onClick={onMakeADrink}>Make</Button>}{' '}
      </div>
    </Form>
  )
}

export default observer(RecipeForm)
