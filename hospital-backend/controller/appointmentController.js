import { catchAsycnErrors } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Appointment } from "../model/appointmentSchema.js";
import { User } from "../model/UserSchema.js";
import { sendMail } from "../utils/sendMail.js"; // ✅ Import sendMail

export const postAppointment = catchAsycnErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  // ✅ Send confirmation email to the user
  await sendMail({
    to: email,
    subject: "Appointment Confirmation - Jeevan Chaya Medical Center",
    text: `Dear ${firstName} ${lastName},

Thank you for booking your appointment with us.

We have successfully received your appointment request for the ${department} department with Dr. ${doctor_firstName} ${doctor_lastName} on ${appointment_date}.

We will contact you shortly to confirm the exact appointment time once the doctor is available.

Best regards,
Team Jeevan Chaya Medical Center`,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Sent! A confirmation email has been sent.",
  });
});
