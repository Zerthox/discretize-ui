import { Icon, Item } from '@discretize/gw2-ui-new';
import { useMediaQuery, useTheme } from '@mui/material';
import DynamicItem from '../../helpers/DynamicItem/DynamicItem';
import firstUppercase from '../../helpers/firstUppercase';
import NoSelection from '../../helpers/NoSelection';
import TextDivider from '../../helpers/TextDivider/TextDivider';
import { useStyles } from '../Armor/Armor';
import { Infusions } from '../BackAndTrinkets/BackAndTrinkets';

type ItemUpgrades = React.ComponentProps<typeof Item>['upgrades'];

function createUpgrades(array: (number | undefined)[]): ItemUpgrades {
  return array.filter((elem) => typeof elem === 'number') as number[];
}
function formatSigil(text: string): string {
  return firstUppercase(
    text
      .replace('Superior Sigil of ', '')
      .replace('Überlegenes Sigill der ', '')
      .replace('Überlegenes Sigill des ', '')
      .replace("Rune d'érudit ", ''),
  );
}

type Affix = React.ComponentProps<typeof Item>['stat'];
type Rarity = React.ComponentProps<typeof DynamicItem>['rarity'];

export interface WeaponsProps {
  showInfusions?: boolean;
  weapon1MainId?: number;
  weapon1MainSigil1Id?: number;
  weapon1MainSigil2Id?: number;
  weapon1MainType?: string;
  weapon1MainAffix?: Affix;
  weapon1MainSigil1?: string;
  weapon1MainSigil2?: string;
  weapon1MainInfusion1Id?: number;
  weapon1MainInfusion2Id?: number;
  weapon1MainRarity?: Rarity;
  weapon1OffId?: number;
  weapon1OffSigilId?: number;
  weapon1OffType?: string;
  weapon1OffAffix?: Affix;
  weapon1OffSigil?: string;
  weapon1OffInfusionId?: number;
  weapon1OffRarity?: Rarity;
  weapon2MainId?: number;
  weapon2MainSigil1Id?: number;
  weapon2MainSigil2Id?: number;
  weapon2MainType?: string;
  weapon2MainAffix?: Affix;
  weapon2MainSigil1?: string;
  weapon2MainSigil2?: string;
  weapon2MainInfusion1Id?: number;
  weapon2MainInfusion2Id?: number;
  weapon2MainRarity?: Rarity;
  weapon2OffId?: number;
  weapon2OffSigilId?: number;
  weapon2OffType?: string;
  weapon2OffAffix?: Affix;
  weapon2OffSigil?: string;
  weapon2OffInfusionId?: number;
  weapon2OffRarity?: Rarity;
}

const Weapons = ({
  showInfusions = true,
  weapon1MainId,
  weapon1MainSigil1Id,
  weapon1MainSigil2Id,
  weapon1MainType,
  weapon1MainAffix,
  weapon1MainSigil1,
  weapon1MainSigil2,
  weapon1MainInfusion1Id,
  weapon1MainInfusion2Id,
  weapon1MainRarity,
  weapon1OffId,
  weapon1OffSigilId,
  weapon1OffType,
  weapon1OffAffix,
  weapon1OffSigil,
  weapon1OffInfusionId,
  weapon1OffRarity,
  weapon2MainId,
  weapon2MainSigil1Id,
  weapon2MainSigil2Id,
  weapon2MainType,
  weapon2MainAffix,
  weapon2MainSigil1,
  weapon2MainSigil2,
  weapon2MainInfusion1Id,
  weapon2MainInfusion2Id,
  weapon2MainRarity,
  weapon2OffId,
  weapon2OffSigilId,
  weapon2OffType,
  weapon2OffAffix,
  weapon2OffSigil,
  weapon2OffInfusionId,
  weapon2OffRarity,
}: WeaponsProps) => {
  const { classes } = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const ItemDetails = ({
    affix,
    infusion1Id,
    infusion2Id,
    sigil1Id,
    sigil1Name,
    sigil2Id,
    sigil2Name,
  }: {
    affix?: string;
    infusion1Id?: number;
    infusion2Id?: number;
    sigil1Id?: number;
    sigil1Name?: string;
    sigil2Id?: number;
    sigil2Name?: string;
  }) => (
    <div className={classes.listItemText}>
      {affix ? (
        <>
          <span className={classes.primaryText}>{affix}</span>
          <div className={classes.secondaryText}>
            {sigil1Id ? <Item id={sigil1Id} text={formatSigil} /> : sigil1Name}
            {(sigil2Id || sigil2Name) && <br />}
            {sigil2Id ? <Item id={sigil2Id} text={formatSigil} /> : sigil2Name}
            {showInfusions && (
              <>
                <Infusions infusionIds={[infusion1Id, infusion2Id]} />
              </>
            )}
          </div>
        </>
      ) : (
        <span className={classes.primaryText}>Empty</span>
      )}
    </div>
  );

  return (
    <>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          {weapon1MainId || weapon1MainType ? (
            <>
              <DynamicItem
                id={weapon1MainId}
                affix={weapon1MainAffix}
                rarity={weapon1MainRarity}
                type={weapon1MainType}
                upgrades={createUpgrades([
                  weapon1MainSigil1Id,
                  weapon1MainSigil2Id,
                  weapon1MainInfusion1Id,
                  weapon1MainInfusion2Id,
                ])}
              />
              <ItemDetails
                affix={weapon1MainAffix}
                infusion1Id={weapon1MainInfusion1Id}
                infusion2Id={weapon1MainInfusion2Id}
                sigil1Id={weapon1MainSigil1Id}
                sigil1Name={weapon1MainSigil1}
                sigil2Id={weapon1MainSigil2Id}
                sigil2Name={weapon1MainSigil2}
              />
            </>
          ) : (
            <>
              <NoSelection size={isMobile ? 'large2' : 'big'} />
              <ItemDetails />
            </>
          )}
        </li>

        {(weapon1OffId || weapon1OffType) && (
          <li className={classes.listItem}>
            <DynamicItem
              id={weapon1OffId}
              affix={weapon1OffAffix}
              rarity={weapon1OffRarity}
              type={weapon1OffType}
              upgrades={createUpgrades([
                weapon1OffSigilId,
                weapon1OffInfusionId,
              ])}
            />
            <ItemDetails
              affix={weapon1OffAffix}
              infusion1Id={weapon1OffInfusionId}
              sigil1Id={weapon1OffSigilId}
              sigil1Name={weapon1OffSigil}
            />
          </li>
        )}
        {!weapon1OffId && !weapon1MainSigil2Id && (
          <li className={classes.listItem}>
            <NoSelection size={isMobile ? 'large2' : 'big'} />
            <ItemDetails />
          </li>
        )}
      </ul>

      {(weapon2MainId || weapon2OffId || weapon2MainType || weapon2OffType) && (
        <>
          <TextDivider>
            <Icon name="WeaponSwap" />
          </TextDivider>

          <ul className={classes.list}>
            {weapon2MainId || weapon2MainType ? (
              <li className={classes.listItem}>
                <DynamicItem
                  id={weapon2MainId}
                  affix={weapon2MainAffix}
                  rarity={weapon2MainRarity}
                  type={weapon2MainType}
                  upgrades={createUpgrades([
                    weapon2MainSigil1Id,
                    weapon2MainSigil2Id,
                    weapon2MainInfusion1Id,
                    weapon2MainInfusion2Id,
                  ])}
                />
                <ItemDetails
                  affix={weapon2MainAffix}
                  infusion1Id={weapon2MainInfusion1Id}
                  infusion2Id={weapon2MainInfusion2Id}
                  sigil1Id={weapon2MainSigil1Id}
                  sigil1Name={weapon2MainSigil1}
                  sigil2Id={weapon2MainSigil2Id}
                  sigil2Name={weapon2MainSigil2}
                />
              </li>
            ) : (
              <li className={classes.listItem}>
                <NoSelection size={isMobile ? 'large2' : 'big'} />
                <ItemDetails />
              </li>
            )}

            {(weapon2OffId || weapon2OffType) && (
              <li className={classes.listItem}>
                <DynamicItem
                  id={weapon2OffId}
                  affix={weapon2OffAffix}
                  rarity={weapon2OffRarity}
                  type={weapon2OffType}
                  upgrades={createUpgrades([
                    weapon2OffSigilId,
                    weapon2OffInfusionId,
                  ])}
                />
                <ItemDetails
                  affix={weapon2OffAffix}
                  infusion1Id={weapon2OffInfusionId}
                  sigil1Id={weapon2OffSigilId}
                  sigil1Name={weapon2OffSigil}
                />
              </li>
            )}
            {!weapon2OffId && !weapon2MainSigil2Id && (
              <li className={classes.listItem}>
                <NoSelection size={isMobile ? 'large2' : 'big'} />
                <ItemDetails />
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default Weapons;
