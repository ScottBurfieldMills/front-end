import React from 'react';
import { bool, number } from 'prop-types';
import { Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'common/constants/api';
import { validationErrorMessages } from 'common/constants/messages';
import Select from 'components/Form/Select/Select';
import ProgressIndicator from 'components/ProgressIndicator/ProgressIndicator';
import styles from './_steps.css';

class MilitaryStatus extends React.Component {
  static propTypes = {
    isSubmitting: bool,
    stepNumber: number,
    totalSteps: number,
  };

  static defaultProps = {
    isSubmitting: false,
    stepNumber: 0,
    totalSteps: 0,
  };

  static validationSchema = Yup.object().shape({
    militaryStatus: Yup.string()
      .nullable()
      .required(validationErrorMessages.required),
  });

  static initialValues = {
    militaryStatus: '',
  };

  static submitHandler = async values => {
    await updateUser(values);
  };

  render() {
    const { isSubmitting, stepNumber, totalSteps } = this.props;

    return (
      <>
        <h3 className={styles.row}>Military Status</h3>

        <ProgressIndicator stepNumber={stepNumber} totalSteps={totalSteps} />

        <p>
          We welcome anyone to join Operation Code! Please note that many of our services are only
          for veterans or spouses.
        </p>
        <p>How do you classify yourself in regards to being part of the military?</p>
        <div className={styles.row}>
          <Field
            className={styles.fullWidth}
            name="militaryStatus"
            label="Military Status*"
            component={Select}
            instanceId="militaryStatus"
            options={[
              {
                value: 'civilian',
                label: 'Not Applicable',
              },
              {
                value: 'current',
                label: 'Currently Serving',
              },
              {
                value: 'veteran',
                label: 'Veteran',
              },
              {
                value: 'spouse',
                label: 'Spouse / Dependent',
              },
            ]}
            disabled={isSubmitting}
          />
        </div>
      </>
    );
  }
}

export default MilitaryStatus;
