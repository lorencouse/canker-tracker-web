import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const ToggleYesNo = ({
  label,
  id,
  checked,
  onCheckedChange,
}: {
  label: string;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div className="my-6 flex items-center justify-between space-x-2">
      <Label htmlFor="sugarUse">{label}</Label>
      <div className="switch flex content-center items-center">
        <span className="mx-2 text-muted-foreground">
          {checked ? 'Yes' : 'No'}
        </span>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
};

export default ToggleYesNo;
