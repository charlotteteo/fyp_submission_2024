import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Slider, Radio} from 'antd';
// import 'antd/dist/antd.css';
import axios from 'axios';

const { Option } = Select;

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form] = Form.useForm();

  const nextStep = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    // Handle form submission here
    console.log('Received values:', values);
    const formattedValues = {
      'personalInformation': {
        'fullName': values.fullName,
        'dob': values.dob,
        'email': values.email,
        'password':values.password,
        'contact': values.contact,
        'occupation': values.occupation,
        'gender': values.gender,
        'maritalStatus': values.maritalstatus,
        'dependents': values.dependents
      },
      'financialSituation': {
        'netWorth': values.netWorth,
        'majorExpenses': values.majorExpenses,
        'earningCapacity': values.earningCapacity
      },
      'investmentObjectives': {
        'investmentTimeHorizon': `${values.investmentTimeHorizon[0]}-${values.investmentTimeHorizon[1]} yrs`,
        'returnRequirements': values.returnRequirements,
        'objectivePrioritisation': values.objectivePrioritisation,
        'futureFinancialGoals': values.futureFinancialGoals
      },
      'riskWillingness': {
        'investmentKnowledge': values.investmentKnowledge,
        'riskPerception': values.riskPerception,
        'responseToLoss': values.responseToLoss,
        'regretAversion': values.regretAversion
      },
      'riskCapacity': {
        'initialInvestment': values.initialInvestment,
        'acceptableReturns': values.acceptableReturns,
        'monthlyContribution': values.monthlyContribution,
        'withdrawalStartTime': values.withdrawalStartTime
      },
      "portfolio":{
          "stocks": [],
          "weights":[],
          "start_date":[],
          "end_date":[]
      },
      "chatbotHistory": {
          "date": [],
          "topic": []
      }
    };
    console.log('Formatted:', formattedValues);

    
    try {
      // Make a POST request to the backend with the form data
      const response = await axios.post('http://localhost:8082/users/', formattedValues);

      // Handle success response
      console.log('Response:', response.data);
      message.success('Form submitted successfully!');
    } catch (error) {
      // Handle error response
      console.error('Error:', error);
      message.error('An error occurred while submitting the form.');
    }
  };

  return (
    <Form
      form={form}
      name="investmentForm"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
    >
      {currentStep === 1 && (
        <>
          
          <h1>Personal Information</h1>
        
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: false, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[{ required: false,  message: 'Please input your date of birth!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: false, type: 'email', message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: false,  message: 'Please input your contact number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Occupation"
            name="occupation"
            rules={[{ required: false,  message: 'Please input your occupation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: false,  message: 'Please input your gender!' }]}
          >
            <Radio.Group>
              <Radio.Button value="female">Female</Radio.Button>
              <Radio.Button value="male">Male</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: false, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
         
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1>Financial Situation</h1>
          <Form.Item
            label="Total net worth"
            name="netWorth"
            rules={[{ required: false, message: 'Please input your total net worth!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major expenses"
            name="majorExpenses"
            rules={[{ required: false, message: 'Please select your major expenses!' }]}
          >
            <Select mode="multiple" placeholder="Select major expenses" name="majorExpenses">
              <Option value="houseConstruction">House Construction</Option>
              <Option value="education">Education</Option>
              <Option value="medicalTreatment">Medical Treatment</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Annual earning capacity"
            name="earningCapacity"
            rules={[{ required: false, message: 'Please input your annual earning capacity!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Marital Status"
            name="maritalstatus"
            rules={[{ required: false,  message: 'Please input your contact number!' }]}
          >
          <Radio.Group>
              <Radio.Button value="single">Single</Radio.Button>
              <Radio.Button value="married">Married</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Number of Dependents"
            name="dependents"
            rules={[{ required: false,  message: 'Please input your contact number!' }]}
          >
          <Input />
          </Form.Item>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1>Investment Objectives</h1>
          <Form.Item
            label="Investment Time Horizon"
            name="investmentTimeHorizon"
            rules={[{ required: false, message: 'Please select your investment time horizon!' }]}
          >
            <Slider
              range
              marks={{10: '10 Years',20: '20 Years',30: '30 Years' }}
              step={1}
              min={1}
              max={30}
            />
          </Form.Item>

          <Form.Item
            label="Return Requirements"
            name="returnRequirements"
            rules={[{ required: false, message: 'Please select your return requirements!' }]}
          >
            <Slider
              marks={{2: '2%',5: '5%',10: '10%',15: '15%' }}
              step={1}
              min={1}
              max={15}
            />
          </Form.Item>

          <Form.Item
            label="Objective Prioritisation"
            name="objectivePrioritisation"
            rules={[{ required: false, message: 'Please select your objective prioritisation!' }]}
          >
            <Select name="objectivePrioritisation">
              <Option value="growth">Growth</Option>
              <Option value="income">Income</Option>
              <Option value="capitalPreservation">Capital Preservation</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Future financial goals"
            name="futureFinancialGoals"
            rules={[{ required: false, message: 'Please select your future financial goals!' }]}
          >
            <Select mode="multiple" placeholder="Select future financial goals" name="futureFinancialGoals">
              <Option value="childsEducation">Child's Education</Option>
              <Option value="retirement">Retirement</Option>
              <Option value="house">House Upgrade</Option>
              <Option value="car">Car Upgrade</Option>
            </Select>
          </Form.Item>
        </>
      )}

      {currentStep === 4 && (
        <>
          <h1>Risk Willingness</h1>
                  <Form.Item
          label=""
          name="investmentGoal"
          rules={[{ required: false, message: 'Please select your investment goal!' }]}
        >
          <p>What is your goal for this account? </p>
          <Radio.Group>
            <Radio.Button value="retirement">Prepare for retirement</Radio.Button>
            <Radio.Button value="majorExpenses">Save for major upcoming expenses (education, health bills, etc.)</Radio.Button>
            <Radio.Button value="special">Save for something special (vacation, new car, etc.)</Radio.Button>
            <Radio.Button value="rainyDay">Build a rainy day fund for emergencies</Radio.Button>
            <Radio.Button value="income">Generate income for expenses</Radio.Button>
            <Radio.Button value="wealth">Build long-term wealth</Radio.Button>
          </Radio.Group>
        </Form.Item>
          <Form.Item
            label=""
            name="investmentKnowledge"
            rules={[{ required: false, message: 'Please select your investment knowledge!' }]}
          >
            <p>What is your understanding of stocks, bonds, and ETFs?</p>
            <Radio.Group>
              <Radio.Button value="no">No</Radio.Button>
              <Radio.Button value="some">Some</Radio.Button>
              <Radio.Button value="good">Good</Radio.Button>
              <Radio.Button value="extensive">Extensive</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="riskPerception"
            rules={[{ required: false, message: 'Please select your risk perception!' }]}
          >
            <p>When you hear “risk” related to your finances, what is the first thought  that comes to mind?</p>
            <Radio.Group name="riskPerception">
              <Radio.Button value="worried">I worry I could be left with nothing.</Radio.Button>
              <Radio.Button value="understand">I understand that it’s an inherent part of the investing process.</Radio.Button>
              <Radio.Button value="opportunity">I see opportunity for great returns.</Radio.Button>
              <Radio.Button value="thrill">I think of the thrill of investing.</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="responseToLoss"
            rules={[{ required: false, message: 'Please select your response to investment loss!' }]}
          >
            <p>When you hear “risk” related to your finances, what is the first thought  that comes to mind?</p>
            <Radio.Group name="responseToLoss">
              <Radio.Button value="sellEverything">Sell everything</Radio.Button>
              <Radio.Button value="sellSome">Sell some</Radio.Button>
              <Radio.Button value="doNothing">Do nothing</Radio.Button>
              <Radio.Button value="reallocate">Reallocate my investments</Radio.Button>
              <Radio.Button value="buyMore">Buy more</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="regretAversion"
            rules={[{ required: false, message: 'Please select your regret aversion!' }]}
          >
            <p>How would you describe your approach to making important financial decisions?</p>
            <Radio.Group name="regretAversion">
              <Radio.Button value="avoidDecisions">I try to avoid making decisions</Radio.Button>
              <Radio.Button value="reluctantlyDecide">I reluctantly make decisions</Radio.Button>
              <Radio.Button value="confidentlyDecide">I confidently make decisions and don’t look back</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      )}

      {currentStep === 5 && (
        <>
          <h1>Risk Capacity</h1>

          <Form.Item
            label=""
            name="initialInvestment"
            rules={[{ required: false, message: 'Please specify your initial investment!' }]}
          >
            <p>"How much do you want to invest to get started?"</p>
            <Radio.Group name="initialInvestment">
              <Radio.Button value="5000-25000">$5,000 to $25,000</Radio.Button>
              <Radio.Button value="moreThan25000">More than $25,000</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="acceptableReturns"
            rules={[{ required: false, message: 'Please select your acceptable range of returns!' }]}
          >
            <p>How much investment value fluctuation would you be comfortable  with 1 year from now?</p>
            <Radio.Group name="acceptableReturns">
              <Radio.Button value="-10%-15%">-10% to 15%</Radio.Button>
              <Radio.Button value="-15%-25%">-15% to 25%</Radio.Button>
              <Radio.Button value="-25%-35%">-25% to 35%</Radio.Button>
              <Radio.Button value="-30%-45%">-30% to 45%</Radio.Button>
              <Radio.Button value="-35%-50%">-35% to 50%</Radio.Button>
              <Radio.Button value="-40%-55%">-40% to 55%</Radio.Button>
              <Radio.Button value="-45%-60%">-45% to 60%</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="monthlyContribution"
            rules={[{ required: false, message: 'Please specify your monthly contribution!' }]}
          >
            <p>How much do you want to contribute each month?</p>
            <Radio.Group name="monthlyContribution">
              <Radio.Button value="<10%">Monthly Contribution / Initial Investment {"<"} 10%</Radio.Button>
              <Radio.Button value=">=10%">Monthly Contribution / Initial Investment ≥ 10%</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label=""
            name="withdrawalStartTime"
            rules={[{ required: false, message: 'Please specify your withdrawal start time or period!' }]}
          >
            <p>How long do you need the income to last?</p>
            <Radio.Group name="withdrawalStartTime">
              <Radio.Button value="1-4years">1 to 4 years</Radio.Button>
              <Radio.Button value="5-9years">5 to 9 years</Radio.Button>
              <Radio.Button value="10-19years">10 to 19 years</Radio.Button>
              <Radio.Button value="over19years">Over 19 years</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      )}

      {/* Navigation Buttons */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        {currentStep > 1 && (
          <Button style={{ marginRight: 8 }} onClick={prevStep}>
            Back
          </Button>
        )}

        {currentStep < 5 && (
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        )}

        {currentStep === 5 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
export default SignUpForm;
