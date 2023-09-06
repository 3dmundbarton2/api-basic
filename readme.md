# Getting Started Instructions - nodeJS/javascript

1. you will need node installed (tested with v20, but should work back to v12-ish) - i used Chocolatey package manager for Windows (https://chocolatey.org/install) - for mac users you can use Brew (https://brew.sh/) - and for linux users you have a package manager of your choice to use  
1. having cloned the repository from GitHub, in the project root direct run `npm install`
1. to execute the one test run `npm test`
   1. You can also run the tests via VSCode if you wish - you should install the extension `CucumberJS Test Runner` and the feature file & associated tests will appear in the Tests Panel

# High-Level Design

## Feature Files 
`/src/features`
This framework uses BDD (Behaviour Driven Design) to provide validation of acceptance criteria.
These criteria are expressed as Gherkin (https://specflow.org/learn/gherkin/, https://cucumber.io/docs/gherkin/reference/) feature files to capture these in human-readable format.
Expressing test scenario behaviours and actions in a common way promotes re-usability

## Step Definitions
`src/steps`
Step definition files are the javascript implementation of the human-readable steps.  
In this example we're using the following libraries 
- `axios` to provide HTTP REST (API) calls as the library's api is greatly simplified over javascript's native http library
- `fluent-assertions` to provide flexible, more intuitive assertions of expected behaviour - this library also provides much more detail on failure over javascript's native assertion library

## Other possible enhancements
- export test results to xml result file for import into pipeline test results or test management tooling
- html reporting of BDD test results - using something like mochawesome - this would give humans reading the test results a more approachable and visual presentation of both the steps executed and the results
- pipeline integration - typically, test execution of this framework wouldn't be executed on a local machine (unless maintaining / triaging failures) - this framework will run at command line in a pipeline, but needs richer result file to clearly describe success / failures in this scenario
- typescript language - Typescript potentially reduces type-related defects (string / number / date) in testware 