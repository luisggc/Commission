import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Platform,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { isEqual } from 'lodash'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RowItem } from 'react-native-sectioned-multi-select/components/RowItem'
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const defaultStyles = {
  container: {

  },
  selectToggle: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 4,
  },
  selectToggleText: {
  },
  item: {
  },
  subItem: {
  },
  itemText: {
    fontSize: 17,
  },
  selectedItemText: {
  },
  selectedSubItemText: {
  },
  subItemText: {
    fontSize: 15,
    paddingLeft: 8,
  },
  searchBar: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {

  },
  subSeparator: {
    height: 0,
  },
  chipContainer: {

  },
  chipText: {

  },
  chipIcon: {

  },
  searchTextInput: {

  },
  scrollView: {

  },
  button: {

  },
  cancelButton: {

  },
  confirmText: {

  },
  toggleIcon: {

  },
  selectedItem: {

  },
}


const defaultColors = {
  primary: '#3f51b5',
  success: '#4caf50',
  cancel: '#1A1A1A',
  text: '#2e2e2e',
  subText: '#848787',
  selectToggleTextColor: '#333',
  searchPlaceholderTextColor: '#999',
  searchSelectionColor: 'rgba(0,0,0,0.2)',
  chipColor: '#848787',
  itemBackground: '#fff',
  subItemBackground: '#ffffff',
  disabled: '#d7d7d7',
}

const noResults = <Text>Sorry, no results</Text>

const loading = (
  <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator />
  </View>
)

// let date = new Date()
class SectionedMultiSelect extends PureComponent {
  static propTypes = {
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    displayKey: PropTypes.string,
    uniqueKey: PropTypes.string.isRequired,
    subKey: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    showDropDowns: PropTypes.bool,
    showChips: PropTypes.bool,
    readOnlyHeadings: PropTypes.bool,
    selectText: PropTypes.string,
    selectedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    renderSelectText: PropTypes.func,
    confirmText: PropTypes.string,
    styles: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    colors: PropTypes.objectOf(PropTypes.string),
    searchPlaceholderText: PropTypes.string,
    noResultsComponent: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    loadingComponent: PropTypes.object,
    subItemFontFamily: PropTypes.object,
    itemFontFamily: PropTypes.object,
    searchTextFontFamily: PropTypes.object,
    confirmFontFamily: PropTypes.object,
    showRemoveAll: PropTypes.bool,
    removeAllText: PropTypes.string,
    modalSupportedOrientations: PropTypes.arrayOf(PropTypes.string),
    modalAnimationType: PropTypes.string,
    hideSearch: PropTypes.bool,
    footerComponent: PropTypes.object,
    selectToggleIconComponent: PropTypes.object,
    cancelIconComponent: PropTypes.object,
    searchIconComponent: PropTypes.object,
    selectedIconComponent: PropTypes.object,
    dropDownToggleIconUpComponent: PropTypes.object,
    dropDownToggleIconDownComponent: PropTypes.object,
    chipRemoveIconComponent: PropTypes.object,
    selectChildren: PropTypes.bool,
    highlightChildren: PropTypes.bool,
    onSelectedItemObjectsChange: PropTypes.func,
    itemNumberOfLines: PropTypes.number,
    selectLabelNumberOfLines: PropTypes.number,
    showCancelButton: PropTypes.bool,
    hideSelect: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    headerComponent: PropTypes.object,
    alwaysShowSelectText: PropTypes.bool,
    searchAdornment: PropTypes.func,
    expandDropDowns: PropTypes.bool,
    animateDropDowns: PropTypes.bool,
    customLayoutAnimation: PropTypes.object,
    filterItems: PropTypes.func,
  }

  static defaultProps = {
    single: false,
    selectedItems: [],
    displayKey: 'name',
    showDropDowns: true,
    showChips: true,
    readOnlyHeadings: false,
    selectText: 'Select',
    selectedText: 'selected',
    confirmText: 'Confirm',
    searchPlaceholderText: 'Search categories...',
    noResultsComponent: noResults,
    loadingComponent: loading,
    styles: {},
    colors: {},
    itemFontFamily: { fontFamily: Platform.OS === 'android' ? 'normal' : 'Avenir', fontWeight: 'bold' },
    subItemFontFamily: { fontFamily: Platform.OS === 'android' ? 'normal' : 'Avenir', fontWeight: '200' },
    searchTextFontFamily: { fontFamily: Platform.OS === 'android' ? 'normal' : 'Avenir', fontWeight: '200' },
    confirmFontFamily: { fontFamily: Platform.OS === 'android' ? 'normal' : 'Avenir', fontWeight: 'bold' },
    removeAllText: 'Remove all',
    showRemoveAll: false,
    modalSupportedOrientations: ['portrait', 'landscape'],
    modalAnimationType: 'fade',
    hideSearch: false,
    selectChildren: false,
    highlightChildren: false,
    itemNumberOfLines: null,
    selectLabelNumberOfLines: 1,
    showCancelButton: false,
    hideSelect: false,
    alwaysShowSelectText: false,
    expandDropDowns: false,
    animateDropDowns: true,
    filterItems: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      selector: false,
      searchTerm: '',
      highlightedChildren: [],
      styles: StyleSheet.flatten([defaultStyles, props.styles]),
      colors: StyleSheet.flatten([defaultColors, props.colors])
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.styles, nextProps.styles)) {
      this.setState({ styles: StyleSheet.flatten([defaultStyles, nextProps.styles]) })
    }
    if (!isEqual(this.props.colors, nextProps.colors)) {
      this.setState({ colors: StyleSheet.flatten([defaultColors, nextProps.colors]) })
    }
  }
  componentDidMount() {
    this.props.searchAdornment
    this.props.searchAdornment(this.props.searchTerm)
  }
  // componentWillUpdate() { date = new Date();}
  // componentDidUpdate() {console.log(new Date().valueOf() - date.valueOf())}

  getProp = (object, key) => object && object[key]

  rejectProp = (items, fn) => items.filter(fn)

  find = (id, items) => {
    if (!items) {
      return {}
    }
    const { uniqueKey, subKey } = this.props
    let i = 0
    let found
    for (; i < items.length; i += 1) {
      if (items[i][uniqueKey] === id) {
        return items[i]
      } else if (Array.isArray(items[i][subKey])) {
        found = this.find(id, items[i][subKey])
        if (found) {
          return found
        }
      }
    }
  }

  reduceSelected = (array, toSplice) => {
    const { uniqueKey } = this.props
    array.reduce((prev, curr) => {
      toSplice.includes(curr[uniqueKey]) &&
        toSplice.splice(toSplice.findIndex(el => (
          el === curr[uniqueKey]
        )), 1)
    }, {})
    return toSplice
  }

  _getSelectLabel = () => {
    const {
      selectText,
      selectedText,
      single,
      selectedItems,
      displayKey,
      alwaysShowSelectText,
      renderSelectText,
    } = this.props

    if (renderSelectText) {
      return renderSelectText(this.props)
    }

    if (!single && alwaysShowSelectText) {
      return selectText
    }
    if (!selectedItems || selectedItems.length === 0) {
      return selectText
    } else if (single || selectedItems.length === 1) {
      const item = selectedItems[0]
      const foundItem = this._findItem(item)
      return this.getProp(foundItem, displayKey) || selectText
    }
    return `${selectText} (${selectedItems.length} ${selectedText})`
  }

  _filterItems = (searchTerm) => {
    const {
      items,
      subKey,
      uniqueKey,
      displayKey,
      filterItems,
    } = this.props

    if (filterItems) {
      return filterItems(searchTerm, items, this.props)
    }
    let filteredItems = []
    let newFilteredItems = []

    items.forEach((item) => {
      const parts = searchTerm.trim().split(/[[ \][)(\\/?\-:]+/)
      const regex = new RegExp(`(${parts.join('|')})`, 'i')
      if (regex.test(this.getProp(item, displayKey))) {
        filteredItems.push(item)
      }
      if (item[subKey]) {
        const newItem = Object.assign({}, item)
        newItem[subKey] = []
        item[subKey].forEach((sub) => {
          if (regex.test(this.getProp(sub, displayKey))) {
            newItem[subKey] = [...newItem[subKey], sub]
            newFilteredItems = this.rejectProp(filteredItems, singleItem =>
              item[uniqueKey] !== singleItem[uniqueKey])
            newFilteredItems.push(newItem)
            filteredItems = newFilteredItems
          }
        })
      }
    })

    return filteredItems
  }

  _removeItem = (item) => {
    const {
      uniqueKey,
      selectedItems,
      onSelectedItemsChange,
      highlightChildren,
      onSelectedItemObjectsChange,
    } = this.props

    const newItems = this.rejectProp(selectedItems, singleItem => (
      item[uniqueKey] !== singleItem
    ))

    highlightChildren && this._unHighlightChildren(item[uniqueKey])
    onSelectedItemObjectsChange && this._broadcastItemObjects(newItems)

    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems)
  }

  _removeAllItems = () => {
    const { onSelectedItemsChange, onSelectedItemObjectsChange } = this.props
    // broadcast new selected items state to parent component
    onSelectedItemsChange([])
    this.setState({ highlightedChildren: [] })
    onSelectedItemObjectsChange && this._broadcastItemObjects([])
  }


  // _removeItems = (items) => {
  //   const {
  //     uniqueKey,
  //     selectedItems,
  //     onSelectedItemsChange,
  //     highlightChildren,
  //     onSelectedItemObjectsChange,
  //   } = this.props

  //   const newItems = selectedItems
  //   const filtered = newItems.filter( el => !items.includes( el ) );

  //   if (highlightChildren) {
  //     // wut
  //     items.forEach((item) => {
  //       this._unHighlightChildren(item)
  //     })
  //     filtered.forEach((item) => {
  //       this._highlightChildren(item)
  //     })
  //   }
  //   onSelectedItemObjectsChange && this._broadcastItemObjects(filtered)

  //   // broadcast new selected items state to parent component
  //   onSelectedItemsChange(filtered)
  // }

  _toggleSelector = () => {
    this.setState({
      selector: !this.state.selector,
    })
  }

  _closeSelector = () => {
    this.setState({
      selector: false,
      searchTerm: '',
    })
  }
  _submitSelection = () => {
    const { onConfirm } = this.props
    this._toggleSelector()
    // reset searchTerm
    this.setState({ searchTerm: '' })
    onConfirm && onConfirm()
  }

  _cancelSelection = () => {
    const { onCancel } = this.props
    // this._removeAllItems()
    this._toggleSelector()
    this.setState({ searchTerm: '' })
    onCancel && onCancel()
  }

  _itemSelected = (item) => {
    const { uniqueKey, selectedItems } = this.props
    return selectedItems.includes(item[uniqueKey])
  }

  _toggleItem = (item, hasChildren) => {
    const {
      single,
      uniqueKey,
      selectedItems,
      onSelectedItemsChange,
      selectChildren,
      highlightChildren,
      onSelectedItemObjectsChange,
    } = this.props


    if (single) {
      this._submitSelection()
      onSelectedItemsChange([item[uniqueKey]])
      onSelectedItemObjectsChange && this._broadcastItemObjects([item[uniqueKey]])
    } else {
      const selected = this._itemSelected(item)
      let newItems = []
      if (selected) {
        if (hasChildren) {
          if (selectChildren) {
            newItems = [...this._rejectChildren(item[uniqueKey])]

            newItems = this.rejectProp(newItems, singleItem => (
              item[uniqueKey] !== singleItem
            ))
          } else if (highlightChildren) {
            this._unHighlightChildren(item[uniqueKey])
            newItems = this.rejectProp(selectedItems, singleItem => (
              item[uniqueKey] !== singleItem
            ))
          } else {
            newItems = this.rejectProp(selectedItems, singleItem => (
              item[uniqueKey] !== singleItem
            ))
          }
        } else {
          newItems = this.rejectProp(selectedItems, singleItem => (
            item[uniqueKey] !== singleItem
          ))
        }
      } else {
        newItems = [...selectedItems, item[uniqueKey]]

        if (hasChildren) {
          if (selectChildren) {
            newItems = [...newItems, ...this._selectChildren(item[uniqueKey])]
          } else if (highlightChildren) {
            this._highlightChildren(item[uniqueKey])
          }
        }
      }
      // broadcast new selected items state to parent component
      onSelectedItemsChange(newItems)
      onSelectedItemObjectsChange && this._broadcastItemObjects(newItems);
    }
  }

  _findItem = (id) => {
    const { items } = this.props
    return this.find(id, items)
  }

  _highlightChildren = (id) => {
    const { items, uniqueKey, subKey } = this.props
    const { highlightedChildren } = this.state
    const highlighted = [...highlightedChildren]

    let i = 0
    for (; i < items.length; i += 1) {
      if (items[i][uniqueKey] === id && Array.isArray(items[i][subKey])) {
        items[i][subKey].forEach((sub) => {
          !highlighted.includes(sub[uniqueKey]) && highlighted.push(sub[uniqueKey])
        })
      }
    }
    this.setState({ highlightedChildren: highlighted })
  }

  _unHighlightChildren = (id) => {
    const { items, uniqueKey, subKey } = this.props
    const { highlightedChildren } = this.state
    const highlighted = [...highlightedChildren]

    const array = items.filter(item => item[uniqueKey] === id)

    if (!array['0']) {
      return
    }
    if (array['0'] && !array['0'][subKey]) {
      return
    }

    const newHighlighted = this.reduceSelected(array['0'][subKey], highlighted)

    this.setState({ highlightedChildren: newHighlighted })
  }

  _selectChildren = (id) => {
    const {
      items,
      selectedItems,
      uniqueKey,
      subKey,
    } = this.props

    let i = 0
    const selected = []
    for (; i < items.length; i += 1) {
      if (items[i][uniqueKey] === id && Array.isArray(items[i][subKey])) {
        items[i][subKey].forEach((sub) => {
          !selectedItems.includes(sub[uniqueKey]) && selected.push(sub[uniqueKey])
        })
      }
    }

    // so we have them in state for SubRowItem should update checks
    this._highlightChildren(id)
    return selected
  }

  _rejectChildren = (id) => {
    const {
      items,
      selectedItems,
      uniqueKey,
      subKey,
    } = this.props
    const arrayOfChildren = items.filter(item => item[uniqueKey] === id)
    const selected = [...selectedItems]
    if (!arrayOfChildren['0']) {
      return
    }
    if (arrayOfChildren['0'] && !arrayOfChildren['0'][subKey]) {
      return
    }

    const newSelected = this.reduceSelected(arrayOfChildren['0'][subKey], selected)

    // update state for SubRowItem component should update checks
    this._unHighlightChildren(id)
    return newSelected
  }

  _getSearchTerm = () => {
    return this.state.searchTerm
  }

  // get the items back as their full objects instead of an array of ids.
  _broadcastItemObjects = (newItems) => {
    const {
      onSelectedItemObjectsChange,
    } = this.props

    const fullItems = []
    newItems.forEach((singleSelectedItem) => {
      const item = this._findItem(singleSelectedItem)
      fullItems.push(item)
    })
    onSelectedItemObjectsChange(fullItems)
  }

  _displaySelectedItems = () => {
    const {
      uniqueKey,
      selectedItems,
      displayKey,
      chipRemoveIconComponent,
    } = this.props
    const { styles, colors } = this.state
    return selectedItems.map((singleSelectedItem) => {
      const item = this._findItem(singleSelectedItem)

      if (!item || !item[displayKey]) return null

      return (

        <View
          style={[{
            overflow: 'hidden',
            justifyContent: 'center',
            height: 34,
            borderColor: colors.chipColor,
            borderWidth: 1,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            margin: 3,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
          }, styles.chipContainer]}
          key={item[uniqueKey]}
        >
          <Text
            numberOfLines={1}
            style={[
              {
                color: colors.chipColor,
                fontSize: 13,
                marginRight: 0,
              },
              styles.chipText]}
          >
            {item[displayKey]}
          </Text>
          <TouchableOpacity
            onPress={() => { this._removeItem(item) }}
            style={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            {chipRemoveIconComponent ?
              chipRemoveIconComponent
              :
              <Icon
                name="close"
                style={[{
                  color: colors.chipColor,
                  fontSize: 16,
                  marginHorizontal: 6,
                  marginVertical: 7,
                }, styles.chipIcon]}
              />}
          </TouchableOpacity>
        </View>
      )
    })
  }

  _renderSeparator = () => (
    <View
      style={[{
        flex: 1,
        height: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        backgroundColor: '#dadada',
      }, this.state.styles.separator]}
    />
  )


  _renderFooter = () => {
    const { footerComponent } = this.props
    return (
      <View>
        {footerComponent && footerComponent}
      </View>
    )
  }

  _renderItemFlatList = ({ item }) => {
    const { styles, colors } = this.state

    const { searchTerm } = this.state
    return (
      <View>
        <RowItem
          item={item}
          mergedStyles={styles}
          mergedColors={colors}
          _itemSelected={this._itemSelected}
          searchTerm={searchTerm}
          _toggleItem={this._toggleItem}
          highlightedChildren={this.state.highlightedChildren}
          {...this.props}
        />
      </View>
    )
  }

  // _renderSubItemFlatList = ({ item }) => (
  //   <RowSubItem
  //     item={item}
  //     _toggleItem={this._toggleItem}
  //     _itemSelected={this._itemSelected}
  //     highlightedChildren={this.state.highlightedChildren}
  //     styles={styles}
  //     {...this.props}
  //   />
  // )

  render() {
    const {
      items,
      selectedItems,
      uniqueKey,
      confirmText,
      searchPlaceholderText,
      noResultsComponent,
      loadingComponent,
      searchTextFontFamily,
      confirmFontFamily,
      single,
      showChips,
      removeAllText,
      showRemoveAll,
      modalAnimationType,
      modalSupportedOrientations,
      hideSearch,
      selectToggleIconComponent,
      cancelIconComponent,
      searchIconComponent,
      showCancelButton,
      hideSelect,
      headerComponent,
      searchAdornment,
      selectLabelNumberOfLines,
    } = this.props

    const {
      searchTerm,
      selector,
      styles,
      colors,
    } = this.state
    const renderItems = searchTerm ? this._filterItems(searchTerm.trim()) : items
    const confirmFont = confirmFontFamily.fontFamily && confirmFontFamily
    const searchTextFont = searchTextFontFamily.fontFamily && searchTextFontFamily
    return (
      <View>
        <Modal
          supportedOrientations={modalSupportedOrientations}
          animationType={modalAnimationType}
          transparent
          visible={selector}
          onRequestClose={this._closeSelector}
        >
          <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }, styles.backdrop]}>
            <View style={[{
              overflow: 'hidden',
              marginHorizontal: 18,
              marginVertical: 26,
              borderRadius: 6,
              alignSelf: 'stretch',
              flex: 1,
              backgroundColor: 'white',
            }, styles.container]}
            >
              {headerComponent && headerComponent}
              {!hideSearch &&
                <View style={[{ flexDirection: 'row', paddingVertical: 5 }, styles.searchBar]}>
                  <View style={styles.center}>
                    {searchIconComponent ?
                      searchIconComponent
                      :
                      <Icon
                        name="search"
                        size={18}
                        style={{ marginHorizontal: 15 }}
                      />}
                  </View>
                  <TextInput
                    selectionColor={colors.searchSelectionColor}
                    onChangeText={searchTerm => this.setState({ searchTerm })}
                    placeholder={searchPlaceholderText}
                    selectTextOnFocus
                    placeholderTextColor={colors.searchPlaceholderTextColor}
                    underlineColorAndroid="transparent"
                    style={[{
                      flex: 1,
                      fontSize: 17,
                      paddingVertical: 8,
                    },
                      searchTextFont,
                    styles.searchTextInput,
                    ]}
                  />
                </View>
              }

              <ScrollView
                keyboardShouldPersistTaps="always"
                style={[{ paddingHorizontal: 12, flex: 1 }, styles.scrollView]}
              >
                {(items && items.length) ?
                  <View>
                    {renderItems.length ?
                      <View>
                        <FlatList
                          keyboardShouldPersistTaps="always"
                          removeClippedSubviews
                          initialNumToRender={15}
                          data={renderItems}
                          extraData={selectedItems}
                          keyExtractor={item => `${item[uniqueKey]}`}
                          ItemSeparatorComponent={this._renderSeparator}
                          ListFooterComponent={this._renderFooter}
                          renderItem={this._renderItemFlatList}
                        />
                      </View>
                      :
                      <View>
                        {noResultsComponent}
                      </View>
                    }
                  </View>
                  :
                  <View>
                    {loadingComponent}
                  </View>
                }
              </ScrollView>
              <View style={{ flexDirection: 'row' }}>
                {showCancelButton &&
                  <Touchable
                    accessibilityComponentType="button"
                    onPress={this._cancelSelection}
                  >
                    <View
                      style={[{
                        width: 54,
                        flex: Platform.OS === 'android' ? 0 : 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 0,
                        flexDirection: 'row',
                        backgroundColor: colors.cancel,
                      },
                      styles.cancelButton,
                      ]}
                    >
                      {cancelIconComponent ?
                        cancelIconComponent
                        :
                        <Icon
                          size={24}
                          name="cancel"
                          style={{ color: 'white' }}
                        />}
                    </View>
                  </Touchable>
                }
                <Touchable
                  accessibilityComponentType="button"
                  onPress={this._submitSelection}
                  style={{ flex: 1 }}
                >
                  <View
                    style={[{
                      flex: Platform.OS === 'android' ? 1 : 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 0,
                      flexDirection: 'row',
                      backgroundColor: colors.primary,
                    },
                    styles.button,
                    ]}
                  >
                    <Text style={[{ fontSize: 18, color: '#ffffff' }, confirmFont, styles.confirmText]}>
                      {confirmText}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </Modal>
        {!hideSelect &&
          <TouchableWithoutFeedback onPress={this._toggleSelector}>
            <View
              style={[{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }, styles.selectToggle]}
            >
              <Text
                numberOfLines={selectLabelNumberOfLines}
                style={[{
                  flex: 1,
                  fontSize: 16,
                  color: colors.selectToggleTextColor,
                }, styles.selectToggleText]}
              >
                {this._getSelectLabel()}
              </Text>
              {selectToggleIconComponent ?
                selectToggleIconComponent
                :
                <Icon
                  size={24}
                  name="keyboard-arrow-down"
                  style={{ color: colors.selectToggleTextColor }}
                />}
            </View>
          </TouchableWithoutFeedback>
        }
        {
          selectedItems.length > 0 && !single && showChips ?
            <View
              style={{
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}
            >
              {selectedItems.length > 1 && showRemoveAll ?
                <View
                  style={[{
                    overflow: 'hidden',
                    justifyContent: 'center',
                    height: 34,
                    borderColor: colors.chipColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10,
                    margin: 3,
                    paddingTop: 0,
                    paddingRight: 10,
                    paddingBottom: 0,
                    borderRadius: 20,
                    borderWidth: 1,
                  }, styles.chipContainer]}
                >
                  <TouchableOpacity
                    onPress={() => { this._removeAllItems() }}
                    style={{
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  >
                    <Text
                      style={[
                        {
                          color: colors.chipColor,
                          fontSize: 13,
                          marginRight: 0,
                        },
                        styles.chipText]}
                    >
                      {removeAllText}
                    </Text>
                  </TouchableOpacity>
                </View>
                :
                null
              }
              {this._displaySelectedItems()}
            </View>
            :
            null
        }
      </View>
    )
  }
}


export default SectionedMultiSelect



// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   FlatList,
//   UIManager
// } from 'react-native';
// import PropTypes from 'prop-types';
// import reject from 'lodash/reject';
// import find from 'lodash/find';
// import get from 'lodash/get';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// const colorPack = {
//   primary: '#00A5FF',
//   primaryDark: '#215191',
//   light: '#FFF',
//   textPrimary: '#525966',
//   placeholderTextColor: '#A9A9A9',
//   danger: '#C62828',
//   borderColor: '#e9e9e9',
//   backgroundColor: '#b1b1b1',
// };

// const styles = {
//   footerWrapper: {
//     flexWrap: 'wrap',
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//   },
//   footerWrapperNC: {
//     width: 320,
//     flexDirection: 'column',
//   },
//   subSection: {
//     backgroundColor: colorPack.light,
//     borderBottomWidth: 1,
//     borderColor: colorPack.borderColor,
//     paddingLeft: 0,
//     paddingRight: 20,
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   greyButton: {
//     height: 40,
//     borderRadius: 5,
//     elevation: 0,
//     backgroundColor: colorPack.backgroundColor,
//   },
//   indicator: {
//     fontSize: 40,
//     color: colorPack.placeholderTextColor,
//   },
//   selectedItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 15,
//     paddingTop: 3,
//     paddingRight: 3,
//     paddingBottom: 3,
//     margin: 3,
//     borderRadius: 20,
//     borderWidth: 2,
//   },
//   button: {
//     height: 40,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: colorPack.light,
//     fontSize: 14,
//   },
//   selectorView: (fixedHeight) => {
//     const style = {
//       flexDirection: 'column',
//       marginBottom: 10,
//       elevation: 2,
//     };
//     if (fixedHeight) {
//       style.height = 250;
//     }
//     return style;
//   },
//   inputGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 16,
//     backgroundColor: colorPack.light,
//   },
//   dropdownView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 40,
//     marginBottom: 10,
//   },
// };


// // set UIManager LayoutAnimationEnabledExperimental
// if (UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default class MultiSelect extends Component {

//   language = {
//     selected: {
//       "pt-BR":"selecionado(s)",
//       "eng":"selected"
//     },
//     add: {
//       "pt-BR":"Adicionar",
//       "eng":"Add"
//     },
//     tap_here: {
//       "pt-BR": "toque aqui",
//       "eng": "tap here"
//     }
//   }

//   static propTypes = {
//     single: PropTypes.bool,
//     selectedItems: PropTypes.array,
//     items: PropTypes.array.isRequired,
//     uniqueKey: PropTypes.string,
//     tagBorderColor: PropTypes.string,
//     tagTextColor: PropTypes.string,
//     fontFamily: PropTypes.string,
//     tagRemoveIconColor: PropTypes.string,
//     onSelectedItemsChange: PropTypes.func.isRequired,
//     selectedItemFontFamily: PropTypes.string,
//     selectedItemTextColor: PropTypes.string,
//     itemFontFamily: PropTypes.string,
//     itemTextColor: PropTypes.string,
//     itemFontSize: PropTypes.number,
//     selectedItemIconColor: PropTypes.string,
//     searchInputPlaceholderText: PropTypes.string,
//     searchInputStyle: PropTypes.object,
//     selectText: PropTypes.string,
//     altFontFamily: PropTypes.string,
//     hideSubmitButton: PropTypes.bool,
//     autoFocusInput: PropTypes.bool,
//     submitButtonColor: PropTypes.string,
//     submitButtonText: PropTypes.string,
//     textColor: PropTypes.string,
//     fontSize: PropTypes.number,
//     fixedHeight: PropTypes.bool,
//     hideTags: PropTypes.bool,
//     canAddItems: PropTypes.bool,
//     onAddItem: PropTypes.func,
//     onChangeInput: PropTypes.func,
//     displayKey: PropTypes.string,
//     language: PropTypes.string
//   };

//   static defaultProps = {
//     single: false,
//     selectedItems: [],
//     items: [],
//     uniqueKey: '_id',
//     tagBorderColor: colorPack.primary,
//     tagTextColor: colorPack.primary,
//     fontFamily: '',
//     tagRemoveIconColor: colorPack.danger,
//     onSelectedItemsChange: () => {},
//     selectedItemFontFamily: '',
//     selectedItemTextColor: colorPack.primary,
//     itemFontFamily: '',
//     itemTextColor: colorPack.textPrimary,
//     itemFontSize: 16,
//     selectedItemIconColor: colorPack.primary,
//     searchInputPlaceholderText: 'Search',
//     searchInputStyle: { color: colorPack.textPrimary },
//     textColor: colorPack.textPrimary,
//     selectText: 'Select',
//     altFontFamily: '',
//     hideSubmitButton: false,
//     autoFocusInput: true,
//     submitButtonColor: '#CCC',
//     submitButtonText: 'Submit',
//     fontSize: 14,
//     fixedHeight: false,
//     hideTags: false,
//     onChangeInput: () => {},
//     displayKey: 'name',
//     canAddItems: false,
//     onAddItem: () => {},
//     language: "en"
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       selector: false,
//       searchTerm: ''
//     };
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextState != this.state;
//   }

//   getSelectedItemsExt = optionalSelctedItems => (
//     <View
//       style={{
//         flexDirection: 'row',
//         flexWrap: 'wrap'
//       }}
//     >
//       {this._displaySelectedItems(optionalSelctedItems)}
//     </View>
//   );

//   _onChangeInput = value => {
//     const { onChangeInput } = this.props;
//     if (onChangeInput) {
//       onChangeInput(value);
//     }
//     this.setState({ searchTerm: value });
//   };

  
//   _getSelectLabel = () => {
//     const { selectText, single, selectedItems, displayKey, language } = this.props;
//     if (!selectedItems || selectedItems.length === 0) {
//       return selectText;
//     } else if (single) {
//       const item = selectedItems[0];
//       const foundItem = this._findItem(item);
//       return get(foundItem, displayKey) || selectText;
//     }
//     return `${selectText} (${selectedItems.length} ${this.language.selected[language]})`;
//   };

//   _findItem = itemKey => {
//     const { items, uniqueKey } = this.props;
//     return find(items, singleItem => singleItem[uniqueKey] === itemKey) || {};
//   };

//   _displaySelectedItems = optionalSelctedItems => {
//     const {
//       fontFamily,
//       tagRemoveIconColor,
//       tagBorderColor,
//       uniqueKey,
//       tagTextColor,
//       selectedItems,
//       displayKey
//     } = this.props;
//     const actualSelectedItems = optionalSelctedItems || selectedItems;
//     return actualSelectedItems.map(singleSelectedItem => {
//       const item = this._findItem(singleSelectedItem);
//       if (!item[displayKey]) return null;
//       return (
//         <View
//           style={[
//             styles.selectedItem,
//             {
//               width: item[displayKey].length * 8 + 60,
//               justifyContent: 'center',
//               height: 40,
//               borderColor: tagBorderColor
//             }
//           ]}
//           key={item[uniqueKey]}
//         >
//           <Text
//             style={[
//               {
//                 flex: 1,
//                 color: tagTextColor,
//                 fontSize: 15
//               },
//               fontFamily ? { fontFamily } : {}
//             ]}
//             numberOfLines={1}
//           >
//             {item[displayKey]}
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               this._removeItem(item);
//             }}
//           >
//             <Icon
//               name="close-circle"
//               style={{
//                 color: tagRemoveIconColor,
//                 fontSize: 22,
//                 marginLeft: 10
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//       );
//     });
//   };

//   _removeItem = item => {
//     const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props;
//     const newItems = reject(
//       selectedItems,
//       singleItem => item[uniqueKey] === singleItem
//     );
//     // broadcast new selected items state to parent component
//     onSelectedItemsChange(newItems);
//   };

//   _removeAllItems = () => {
//     const { onSelectedItemsChange } = this.props;
//     // broadcast new selected items state to parent component
//     onSelectedItemsChange([]);
//   };

//   _toggleSelector = () => {
//     console.log("togleSelector !!")
//     this.setState((state) => ({
//       selector: !state.selector
//     }));
//   };

//   _clearSearchTerm = () => {
//     this.setState({
//       searchTerm: ''
//     });
//   };


//   _submitSelection = () => {
//     this.setState((state) => ({
//       selector: !state.selector,
//       searchTerm: ''
//     }))
//   };

//   _itemSelected = item => {
//     const { uniqueKey, selectedItems } = this.props;
//     return selectedItems.indexOf(item[uniqueKey]) !== -1;
//   };

//   _addItem = () => {
//     const {
//       uniqueKey,
//       items,
//       selectedItems,
//       onSelectedItemsChange,
//       onAddItem
//     } = this.props;
//     let newItems = [];
//     let newSelectedItems = [];
//     const newItemName = this.state.searchTerm;
//     if (newItemName) {
//       const newItemId = newItemName
//         .split(' ')
//         .filter(word => word.length)
//         .join('-');
//       newItems = [...items, { [uniqueKey]: newItemId, name: newItemName }];
//       newSelectedItems = [...selectedItems, newItemId];
//       onAddItem(newItems);
//       onSelectedItemsChange(newSelectedItems);
//       this._clearSearchTerm();
//     }
//   };

//   _toggleItem = item => {
//     const {
//       single,
//       uniqueKey,
//       selectedItems,
//       onSelectedItemsChange
//     } = this.props;
//     if (single) {
//       this._submitSelection();
//       onSelectedItemsChange([item[uniqueKey]]);
//     } else {
//       const status = this._itemSelected(item);
//       let newItems = [];
//       if (status) {
//         newItems = reject(
//           selectedItems,
//           singleItem => item[uniqueKey] === singleItem
//         );
//       } else {
//         newItems = [...selectedItems, item[uniqueKey]];
//       }
//       // broadcast new selected items state to parent component
//       onSelectedItemsChange(newItems);
//     }
//   };

//   _itemStyle = item => {
//     const {
//       selectedItemFontFamily,
//       selectedItemTextColor,
//       itemFontFamily,
//       itemTextColor,
//       itemFontSize
//     } = this.props;
//     const isSelected = this._itemSelected(item);
//     const fontFamily = {};
//     if (isSelected && selectedItemFontFamily) {
//       fontFamily.fontFamily = selectedItemFontFamily;
//     } else if (!isSelected && itemFontFamily) {
//       fontFamily.fontFamily = itemFontFamily;
//     }
//     const color = isSelected
//       ? { color: selectedItemTextColor }
//       : { color: itemTextColor };
//     return {
//       ...fontFamily,
//       ...color,
//       fontSize: itemFontSize
//     };
//   };

//   _getRow = item => {
//     const { selectedItemIconColor, displayKey } = this.props;
//     return (
//       <TouchableOpacity
//         disabled={item.disabled}
//         onPress={() => this._toggleItem(item)}
//         style={{ paddingLeft: 20, paddingRight: 20 }}
//       >
//         <View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text
//               style={[
//                 {
//                   flex: 1,
//                   fontSize: 16,
//                   paddingTop: 5,
//                   paddingBottom: 5
//                 },
//                 this._itemStyle(item),
//                 item.disabled ? { color: 'grey' } : {}
//               ]}
//             >
//               {item[displayKey]}
//             </Text>
//             {this._itemSelected(item) ? (
//               <Icon
//                 name="check"
//                 style={{
//                   fontSize: 20,
//                   color: selectedItemIconColor
//                 }}
//               />
//             ) : null}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   _getRowNew = item => (
//     <TouchableOpacity
//       disabled={item.disabled}
//       onPress={() => this._addItem(item)}
//       style={{ paddingLeft: 20, paddingRight: 20 }}
//     >
//       <View>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text
//             style={[
//               {
//                 flex: 1,
//                 fontSize: 16,
//                 paddingTop: 5,
//                 paddingBottom: 5
//               },
//               this._itemStyle(item),
//               item.disabled ? { color: 'grey' } : {}
//             ]}
//           >
//             {this.language.add[this.props.language]} {item.name} ({this.language.tap_here[this.props.language]})
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   _filterItems = searchTerm => {
//     const { items, displayKey } = this.props;
//     const filteredItems = [];
//     items.forEach(item => {
//       const parts = searchTerm.trim().split(/[ \-:]+/);
//       const regex = new RegExp(`(${parts.join('|')})`, 'ig');
//       if (regex.test(get(item, displayKey))) {
//         filteredItems.push(item);
//       }
//     });
//     return filteredItems;
//   };

//   _renderItems = () => {
//     console.log("renderitems")
//     const {
//       canAddItems,
//       items,
//       fontFamily,
//       uniqueKey,
//       selectedItems
//     } = this.props;
//     const { searchTerm } = this.state;
//     let component = null;
//     // If searchTerm matches an item in the list, we should not add a new
//     // element to the list.
//     let searchTermMatch;
//     let itemList;
//     let addItemRow;
//     const renderItems = searchTerm ? this._filterItems(searchTerm) : items;
//     if (renderItems.length) {
//       itemList = (
//         <FlatList
//           data={renderItems}
//           extraData={selectedItems}
//           keyExtractor={item => item[uniqueKey]}
//           renderItem={rowData => this._getRow(rowData.item)}
//         />
//       );
//       searchTermMatch = renderItems.filter(item => item.name === searchTerm)
//         .length;
//     } else if (!canAddItems) {
//       itemList = (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text
//             style={[
//               {
//                 flex: 1,
//                 marginTop: 20,
//                 textAlign: 'center',
//                 color: colorPack.danger
//               },
//               fontFamily ? { fontFamily } : {}
//             ]}
//           >
//             No item to display.
//           </Text>
//         </View>
//       );
//     }

//     if (canAddItems && !searchTermMatch && searchTerm.length) {
//       addItemRow = this._getRowNew({ name: searchTerm });
//     }
//     component = (
//       <View>
//         {itemList}
//         {addItemRow}
//       </View>
//     );
//     return component;
//   };

//   render() {
//     const {
//       selectedItems,
//       single,
//       fontFamily,
//       altFontFamily,
//       searchInputPlaceholderText,
//       searchInputStyle,
//       hideSubmitButton,
//       autoFocusInput,
//       submitButtonColor,
//       submitButtonText,
//       fontSize,
//       textColor,
//       fixedHeight,
//       hideTags,
//       containerStyle
//     } = this.props;
//     const { searchTerm, selector } = this.state;
//     console.log("xxxrender")
//     console.log("selector" + selector)
//     console.log("hideSubmitbutton"+hideSubmitButton)
//     console.log("xxxendrender")
//     return (
//       <View
//         style={{
//           flexDirection: 'column',
//           marginBottom: 10
//         }}
//       >
//         {selector ? (
//           <View style={[styles.selectorView(fixedHeight), containerStyle]}>
//             <View style={[styles.inputGroup,containerStyle]}>
//               <Icon
//                 name="magnify"
//                 size={20}
//                 color={colorPack.placeholderTextColor}
//                 style={{ marginRight: 10 }}
//               />
//               <TextInput
//                 autoFocus={autoFocusInput}
//                 onChangeText={this._onChangeInput}
//                 blurOnSubmit={false}
//                 onSubmitEditing={this._addItem}
//                 placeholder={searchInputPlaceholderText}
//                 placeholderTextColor={colorPack.placeholderTextColor}
//                 underlineColorAndroid="transparent"
//                 style={[searchInputStyle, { flex: 1 }]}
//                 value={searchTerm}
//               />
//               {hideSubmitButton && (
//                 <TouchableOpacity onPress={this._submitSelection}>
//                   <Icon
//                     name="menu-down"
//                     style={[
//                       styles.indicator,
//                       { paddingHorizontal: 15 }
//                     ]}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 backgroundColor: '#fafafa'
//               }}
//             >
//               <View>{this._renderItems()}</View>
//               {!single &&
//                 !hideSubmitButton && (
//                   <TouchableOpacity
//                     onPress={() => this._submitSelection()}
//                     style={[
//                       styles.button,
//                       { backgroundColor: submitButtonColor }
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.buttonText,
//                         fontFamily ? { fontFamily } : {}
//                       ]}
//                     >
//                       {submitButtonText}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//             </View>
//           </View>
//         ) : (
//           <View>
//             <View style={[styles.dropdownView, containerStyle]}>
//               <View
//                 style={[
//                   styles.subSection,
//                   { paddingTop: 0, paddingBottom: 10 },
//                   containerStyle
//                 ]}
//               >
//                 <TouchableWithoutFeedback onPress={this._toggleSelector}>
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: 'row',
//                       alignItems: 'center'
//                     }}
//                   >
//                     <Text
//                       style={[
//                         {
//                           flex: 1,
//                           fontSize: fontSize || 16,
//                           color: textColor || colorPack.placeholderTextColor,
//                           marginTop: 10
//                         },
//                         altFontFamily
//                           ? { fontFamily: altFontFamily }
//                           : fontFamily ? { fontFamily } : {},
//                       ]}
//                       numberOfLines={1}
//                     >
//                       {this._getSelectLabel()}
//                     </Text>
//                     <Icon
//                       name={hideSubmitButton ? 'menu-right' : 'menu-down'}
//                       style={styles.indicator}
//                     />
//                   </View>
//                 </TouchableWithoutFeedback>
//               </View>
//             </View>
//             {!single && !hideTags && selectedItems.length ? (
//               <View
//                 style={[{
//                   flexDirection: 'row',
//                   flexWrap: 'wrap'
//                 },containerStyle]}
//               >
//                 {this._displaySelectedItems()}
//               </View>
//             ) : null}
//           </View>
//         )}
//       </View>
//     );
//   }
// }

