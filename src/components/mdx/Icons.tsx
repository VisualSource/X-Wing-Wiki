import "../../icons.css";

type IconProps = {
  className?: string;
};

const icons = {
  Straight: () => <i className="font-straight"></i>,
  Boost: () => <i className="font-boost"></i>,
  Lock: () => <i className="font-lock"></i>,
  Forcepower: () => <i className="font-forcepower"></i>,
  Focus: () => <i className="font-focus"></i>,
  Title: () => <i className="font-title"></i>,
  Slam: () => <i className="font-slam"></i>,
  Jam: () => <i className="font-jam"></i>,
  Reload: () => <i className="font-reload"></i>,
  Reinforce: () => <i className="font-reinforce"></i>,
  Cannon: () => <i className="font-cannon"></i>,
  Torpedo: () => <i className="font-torpedo"></i>,
  Missile: () => <i className="font-missile"></i>,
  FrontArc: ({ className = "" }: IconProps) => (
    <i className={`font-frontarc ${className}`.trim()}></i>
  ),
  LeftArc: ({ className = "" }: IconProps) => (
    <i className={`font-leftarc ${className}`}></i>
  ),
  RightArc: ({ className = "" }: IconProps) => (
    <i className={`font-rightarc ${className}`}></i>
  ),
  RearArc: ({ className = "" }: IconProps) => (
    <i className={`font-reararc ${className}`}></i>
  ),
  BullsEyeArc: ({ className = "" }: IconProps) => (
    <i className={`font-bullseyearc ${className}`}></i>
  ),
  FullFrontArc: ({ className = "" }: IconProps) => (
    <i className={`font-fullfrontarc ${className}`}></i>
  ),
  FullRearArc: ({ className = "" }: IconProps) => (
    <i className={`font-fullreararc ${className}`}></i>
  ),
  SingleTurretArc: ({ className = "" }: IconProps) => (
    <i className={`font-singleturretarc ${className}`}></i>
  ),
  DoubleTurretArc: ({ className = "" }: IconProps) => (
    <i className={`font-doubleturretarc ${className}`}></i>
  ),
  Rotate: () => <i className="font-rotatearc"></i>,
  Evade: () => <i className="font-evade"></i>,
  Hit: () => <i className="font-hit"></i>,
  Crit: () => <i className="font-crit"></i>,
  BarrelRoll: () => <i className="font-barrelroll"></i>,
  Calculate: () => <i className="font-calculate"></i>,
  Charge: ({ className = "" }: IconProps) => (
    <i className={`font-charge ${className}`.trim()}></i>
  ),
  Shield: ({ className = "" }: IconProps) => (
    <i className={`font-shield ${className}`.trim()}></i>
  ),
  Energy: ({ className = "" }: IconProps) => (
    <i className={`font-energy ${className}`}></i>
  ),
  Cloak: () => <i className="font-cloak"></i>,
  RotateArc: () => <i className="font-rotatearc uppercase"></i>,
  LeftBank: () => <i className="font-bankleft"></i>,
  RightBank: () => <i className="font-bankright"></i>,
  BankLeft: () => <i className="font-bankleft"></i>,
  BankRight: () => <i className="font-bankright"></i>,
  LeftTurn: () => <i className="font-turnleft"></i>,
  TurnLeft: () => <i className="font-turnleft"></i>,
  RightTurn: () => <i className="font-turnright"></i>,
  TurnRight: () => <i className="font-turnright"></i>,
  KTurn: ({ className = "" }: IconProps) => (
    <i className={`font-kturn ${className}`}></i>
  ),
  TallonRight: () => <i className="font-trollright"></i>,
  TallonLeft: () => <i className="font-trollleft"></i>,
  SegnorLeft: () => <i className="font-sloopleft"></i>,
  SegnorRight: () => <i className="font-sloopright"></i>,
  Stationary: () => <i className="font-stop"></i>,
  RStraight: () => <i className="font-reversestraight"></i>,
  RBankRight: () => <i className="font-reversebankright"></i>,
  RBankLeft: () => <i className="font-reversebankleft"></i>,
  Device: () => <i className="font-device"></i>,
  Crew: () => <i className="font-crew"></i>,
  Coordinate: () => <i className="font-coordinate"></i>,
  Linked: () => <i className="font-linked"></i>,
  TacticalRelay: () => <i className="font-tacticalrelay"></i>,
  Astromech: () => <i className="font-astromech"></i>,
  Configuration: () => <i className="font-config"></i>,
  Gunner: () => <i className="font-gunner"></i>,
  Illicit: () => <i className="font-illicit"></i>,
  ForcePowerU: () => <i className="font-forcepoweru"></i>,
  Modification: () => <i className="font-modification"></i>,
  Sensor: () => <i className="font-sensor"></i>,
  Talent: () => <i className="font-talent"></i>,
  Tech: () => <i className="font-tech"></i>,
  Turret: () => <i className="font-turret"></i>,
  RangeBonusIndicator: ({ className = "" }: IconProps) => (
    <i className={`font-rangebonusindicator ${className}`}></i>
  ),
  Hardpoint: () => <i className="font-hardpoint"></i>,
  Point: () => <i className="font-point"></i>,
  Cargo: () => <i className="font-cargo"></i>,
  Command: () => <i className="font-command"></i>,
  Team: () => <i className="font-team"></i>,
  Agility: ({ className = "" }: IconProps) => (
    <i className={`font-agility ${className}`.trim()}></i>
  ),
  Hull: ({ className = "" }: IconProps) => (
    <i className={`font-hull ${className}`.trim()}></i>
  ),
  Unique: ({ className = "" }: IconProps) => (
    <i className={`font-unique ${className}`.trim()}></i>
  ),
  Recurring: ({ className = "" }: IconProps) => (
    <i className={`font-recurring ${className}`.trim()}></i>
  ),
  DoubleRecurring: ({ className = "" }: IconProps) => (
    <i className={`font-doublerecurring ${className}`.trim()}></i>
  ),
  Forcecharge: ({ className = "" }: IconProps) => (
    <i className={`font-forcecharge ${className}`.trim()}></i>
  ),
};

export type IconNames = keyof typeof icons;
(
  icons as unknown as IconNames & {
    BullseyeArc: (props: IconProps) => JSX.Element;
  }
).BullseyeArc = icons.BullsEyeArc;
(
  icons as unknown as IconNames & { CriticalHit: () => JSX.Element }
).CriticalHit = icons.Crit;
(
  icons as unknown as IconNames & { Force: (props: IconProps) => JSX.Element }
).Force = icons.Forcecharge;
(
  icons as unknown as IconNames & {
    KoiogranTurn: (props: IconProps) => JSX.Element;
  }
).KoiogranTurn = icons.KTurn;

export default icons;
