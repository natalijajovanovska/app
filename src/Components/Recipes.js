import React from 'react';
import './Recipes.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

class Recipes extends React.Component {

  constructor() {
    super();
    this.state = {
      recipes: [],
      showAdd: false,
      showEdit: false,
      currentIndex: 0,
      newestRecipe: { recipeName: "", ingredients: [], preparation: "" },
      def: -1
    }
  }

  //Deletes a recipe
  deleteRecipe(index) {
    if (window.confirm("Do you want to delete this recipe?")) {
      let recipes = this.state.recipes.slice();
      recipes.splice(index, 1);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      this.setState({ recipes });
      this.setState({ def: 0 });
    }
  }

  //Update a recipe - updates newestRecipe
  updateNewestRecipe(recipeName, ingredients, preparation) {
    this.setState({ newestRecipe: { recipeName: recipeName, ingredients: ingredients, preparation: preparation } })
  }

  //Saves new recipe in recipes
  saveNewRecipe() {
    if (this.state.newestRecipe.recipeName < 1 || this.state.newestRecipe.ingredients < 1 || this.state.newestRecipe.preparation < 1) {
      alert("Enter Recipe");
    } else {
      let recipes = this.state.recipes.slice();
      recipes.push({ recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients, preparation: this.state.newestRecipe.preparation });
      localStorage.setItem('recipes', JSON.stringify(recipes));
      this.setState({ recipes });
      this.setState({ newestRecipe: { recipeName: "", ingredients: [], preparation: "" } });
      this.close();
    }
  }

  //Closes a modal
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false })
    } else if (this.state.showEdit) {
      this.setState({ showEdit: false })
    }
  }

  //Opens a modal
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  }

  //Update recipe name
  updateRecipeName(recipeName, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName: recipeName, ingredients: recipes[currentIndex].ingredients, preparation: recipes[currentIndex].preparation };
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  //Update ingredients
  updateIngredients(ingredients, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName: recipes[currentIndex].recipeName, ingredients: ingredients, preparation: recipes[currentIndex].preparation };
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  //Update preparation
  updatePreparation(preparation, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName: recipes[currentIndex].recipeName, ingredients: recipes[currentIndex].ingredients, preparation: preparation };
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({ recipes });
  }

  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;

    return (
      <div className="container my-5" >
        <div className="container" >
          <div className="row"  >
            <div className="col-md-12" >
              <button className="btn mx-auto d-block btn-lg text-white button-tomato mb-5" onClick={(event) => this.open("showAdd", currentIndex)}>Add Recipe</button>
              {recipes.length > 0 && (
                <div>
                  <Accordion defaultActiveKey={this.state.def} id="Recipes">
                    {recipes.map((recipe, index) => (
                      <Card key={index}>
                        <Accordion.Toggle className="bg-info text-white accordion-header-custom text-center" as={Card.Header} eventKey={index} key={index}>
                          {recipe.recipeName}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body>
                            <ul className="ul-recipe">
                              {recipe.ingredients.map((item) => (
                                <li key={item}> {item} </li>
                              ))}
                            </ul>
                            <hr />
                            <p className="text-align-custom">{recipe.preparation}</p>
                            <ButtonToolbar className="mt-5 d-flex justify-content-end">
                              <Button className="btn-small" variant="danger mr-3" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                              <Button variant="default" onClick={(event) => this.open("showEdit", index)}>Edit Recipe</Button>
                            </ButtonToolbar>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                  <Modal show={this.state.showEdit} onHide={this.close} className="mt-5">
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FormGroup controlId="formBasicsText">
                        <FormLabel>Recipe Name</FormLabel>
                        <FormControl
                          type="text"
                          value={recipes[currentIndex].recipeName}
                          placeholder="Edit Recipe Name"
                          onChange={(event) => this.updateRecipeName(event.target.value, currentIndex)}>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="formControlsTextarea">
                        <FormLabel>Ingredients</FormLabel>
                        <FormControl as="textarea"
                          rows="3"
                          value={recipes[currentIndex].ingredients}
                          placeholder="Edit Ingredients (Separate by commas)"
                          onChange={(event) => this.updateIngredients(event.target.value.split(","), currentIndex)}>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="formBasicText2">
                        <FormLabel>Edit Preparation</FormLabel>
                        <FormControl as="textarea"
                          rows="3"
                          value={recipes[currentIndex].preparation}
                          placeholder="Edit Preparation"
                          onChange={(event) => this.updatePreparation(event.target.value, currentIndex)}>
                        </FormControl>
                      </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                      <button className="btn btn-success" onClick={(event) => { this.close() }}>Save Edited Recipe</button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
              <Modal show={this.state.showAdd} onHide={this.close} className="mt-5">
                <Modal.Header closeButton>
                  <Modal.Title>Add Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormGroup controlId="formBasicText">
                    <FormLabel>Recipe Name</FormLabel>
                    <FormControl
                      type="text"
                      value={newestRecipe.recipeName}
                      placeholder="Enter Recipe Name"
                      onChange={(event) => this.updateNewestRecipe(event.target.value, newestRecipe.ingredients, newestRecipe.preparation)}>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl as="textarea"
                      rows="3"
                      value={newestRecipe.ingredients}
                      placeholder="Enter Ingredients (Separate by commas)"
                      onChange={(event) => this.updateNewestRecipe(newestRecipe.recipeName, event.target.value.split(","), newestRecipe.preparation)}>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="formBasicText2">
                    <FormLabel>Preparation</FormLabel>
                    <FormControl as="textarea"
                      rows="3"
                      value={newestRecipe.preparation}
                      placeholder="Preparation"
                      onChange={(event) => this.updateNewestRecipe(newestRecipe.recipeName, newestRecipe.ingredients, event.target.value)}>
                    </FormControl>
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-success" onClick={(event) => { this.saveNewRecipe() }}>Save</button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;