import { Check, X } from 'lucide-react';

const PasswordCriteria=({password})=> {
  const criteria=[
    {label: "At least 6 characters", met: password.length>=6},
    {label: "Contains upper case letter", met: /[A-Z]/.test(password)},
    {label: "Contains lower case letter", met: /[a-z]/.test(password)},
    {label: "Contains a number", met: /\d/.test(password)},
    {label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password)}
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item, idx)=> (
        <div key={idx} className="flex items-center text-xs">
          {item.met ? (
            <Check className='size-4 text-green-500 mr-2'/>
          ) : (
            <X className='size-4 text-gray-400 mr-2'/>
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

const PasswordStrength = ({password}) => {
  const getStrength=(pass)=> {
    let strength=0;
    if(pass.length>=6) strength+=1;
    if(pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength+=1;
    if(pass.match(/\d/)) strength+=1;
    if(pass.match(/[^A-Za-z0-9]/)) strength+=1;

    return strength;
  };

  const strength=getStrength(password);

  const getStrengthText=(strength)=> {
    if(strength===0) return "Very weak";
    if(strength===1) return "Weak";
    if(strength===2) return "Fair";
    if(strength===3) return "Good";
    return "Strong"
  };

  const getColor=(strength)=> {
    if(strength===0) return "bg-red-500";
    if(strength===1) return "bg-red-400";
    if(strength===2) return "bg-yellow-500";
    if(strength===3) return "bg-yellow-400";
    return "bg-green-500";
  }

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-xs text-gray-400'>Password strength</span>
        <span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
      </div>

      <div className='flex space-x-1'>
        {[...Array(4)].map((_, idx)=> {
          return (
            <div
              key={idx}
              className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${idx<strength ? getColor(strength) : "bg-gray-600"}`}
            />
          )
        })}
      </div>

      <PasswordCriteria password={password}/>
    </div>
  )
}

export default PasswordStrength;