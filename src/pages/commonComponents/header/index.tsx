import React from 'react';
import {Appbar} from 'react-native-paper';
import {WHITE} from '../../../common/colors';
import {ARABIC, ENGLISH} from '../../../common/appConstants';
import {
  ARABIC_LANGUAGE,
  changeLocale,
  ENGLISH_LANGUAGE,
} from '../../../localize';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import styles from './styles';
import {Text, View} from 'react-native';
import {useAppSelector} from '../../../redux';

type LanguageMenuProps = {
  language: string;
};
type HeaderProps = {
  title: string;
};
// Language change menu
const LanguageMenu = ({language}: LanguageMenuProps) => {
  const curLangName = language === ARABIC_LANGUAGE ? ARABIC : ENGLISH;
  return (
    <Menu onSelect={value => changeLocale(value)}>
      <MenuTrigger>
        <View style={styles.rowStyle}>
          <Text style={styles.labelText}>{curLangName}</Text>
          <Appbar.Action icon="chevron-down" color={WHITE} size={32} />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuContainer,
        }}>
        <MenuOption
          value={ENGLISH_LANGUAGE}
          text={ENGLISH}
          customStyles={{
            optionText:
              language === ENGLISH_LANGUAGE
                ? styles.langSelectedText
                : styles.langText,
          }}
          disabled={language === ENGLISH_LANGUAGE}
        />
        <MenuOption
          value={ARABIC_LANGUAGE}
          text={ARABIC}
          customStyles={{
            optionText:
              language === ARABIC_LANGUAGE
                ? styles.langSelectedText
                : styles.langText,
          }}
          disabled={language === ARABIC_LANGUAGE}
        />
      </MenuOptions>
    </Menu>
  );
};

const Header = ({title}: HeaderProps) => {
  const {language} = useAppSelector(state => state.app);

  return (
    <>
      <Appbar.Header style={styles.header} mode="small">
        <Appbar.Content title={title} color={WHITE} />
        <LanguageMenu language={language} />
      </Appbar.Header>
    </>
  );
};

export default Header;
