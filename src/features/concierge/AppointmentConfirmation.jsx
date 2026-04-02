import PropTypes from 'prop-types';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../../components/atoms/Button';

export function AppointmentConfirmation({ confirmation, onClose, onBookAnother }) {
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      : null;

  const details = [
    { icon: <User size={16} />, label: 'Name', value: `${confirmation.firstName} ${confirmation.lastName}` },
    { icon: <Mail size={16} />, label: 'Email', value: confirmation.email },
    { icon: <Phone size={16} />, label: 'Phone', value: confirmation.phone },
    { icon: <Calendar size={16} />, label: 'Date', value: formatDate(confirmation.dateFirst) },
    { icon: <Clock size={16} />, label: 'Time', value: confirmation.timeFirst },
    confirmation.appointmentType === 'In store' && confirmation.storeSearch
      ? { icon: <MapPin size={16} />, label: 'Store', value: confirmation.storeSearch }
      : null,
    { icon: null, label: 'Type', value: confirmation.appointmentType },
    confirmation.duration ? { icon: null, label: 'Duration', value: confirmation.duration } : null,
  ].filter(Boolean);

  return (
    <div className="text-center animate-fade-in py-4">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      <h3 className="text-2xl font-light text-gray-900 mb-1">You&apos;re all set!</h3>
      <p className="text-gray-500 text-sm mb-6">
        Your appointment has been confirmed. A confirmation email will be sent to{' '}
        <strong className="text-gray-700">{confirmation.email}</strong>.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Appointment Details
          </p>
          <span className="text-xs font-mono text-gray-400">
            #{confirmation.customerId.split('-')[0].toUpperCase()}
          </span>
        </div>
        <dl className="space-y-2.5">
          {details.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              {icon ? (
                <span className="text-gray-400 flex-shrink-0 w-4">{icon}</span>
              ) : (
                <span className="w-4 flex-shrink-0" />
              )}
              <dt className="text-gray-400 w-16 flex-shrink-0">{label}:</dt>
              <dd className="text-gray-700 font-medium truncate">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="primary" fullWidth onClick={onClose}>
          Continue Shopping
        </Button>
        <Button variant="ghost" fullWidth onClick={onBookAnother}>
          Book Another Appointment
        </Button>
      </div>
    </div>
  );
}

AppointmentConfirmation.propTypes = {
  confirmation: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    dateFirst: PropTypes.string.isRequired,
    timeFirst: PropTypes.string.isRequired,
    appointmentType: PropTypes.string.isRequired,
    storeSearch: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onBookAnother: PropTypes.func.isRequired,
};
