import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
  }

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <div id="stepper1" class="bs-stepper">
          <div class="bs-stepper-header">
            <div class="step" data-target="#test-l-1">
              <button class="step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Email</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-2">
              <button class="step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Password</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-3">
              <button class="step-trigger">
                <span class="bs-stepper-circle">3</span>
                <span class="bs-stepper-label">Validate</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <form onSubmit={this.onSubmit}>
              <div id="test-l-1" class="content">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <button class="btn btn-primary" onClick={() => this.stepper.next()}>Next</button>
              </div>
              <div id="test-l-2" class="content">
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button class="btn btn-primary" onClick={() => this.stepper.next()}>Next</button>
              </div>
              <div id="test-l-3" class="content text-center">
                <button type="submit" class="btn btn-primary mt-5">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}