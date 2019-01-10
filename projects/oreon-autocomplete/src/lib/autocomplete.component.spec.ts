import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteComponent } from './autocomplete.component';
import mockUsers from './mock-users';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty list of filteredUsers when the comment is empty', () => {
    component.comment = '';
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: '',
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(0);
  });

  it('should have an empty list of filteredUsers when there is no regex match', () => {
    component.comment = 'Hello, world';
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: component.comment,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(0);
  });

  it('should have a list of filteredUsers with length 5', () => {
    component.comment = '@r';
    component.users = mockUsers;
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: component.comment,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(5);
  });

  it('should have a list of filteredUsers, only containing "Bilbo Baggins"', () => {
    component.comment = '@b';
    component.users = mockUsers;
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: component.comment,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0]).toEqual(jasmine.objectContaining({
      name: 'Bilbo Baggins'
    }));
  });

  it('should have a list of filteredUsers, only containing "Radagast TheBrown", aka "LittleGandalf"', () => {
    component.comment = '@little';
    component.users = mockUsers;
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: component.comment,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0]).toEqual(jasmine.objectContaining({
      username: 'LittleGandalf'
    }));
  });

  it('should have a list of filteredUsers, only containing "Robin Hood"', () => {
    component.comment = '@robinh';
    component.users = mockUsers;
    component.ngOnChanges({
      comment: {
        previousValue: '',
        currentValue: component.comment,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0]).toEqual(jasmine.objectContaining({
      name: 'Robin Hood'
    }));
  });

  it('should add "@robintron " to the input`s value', () => {
    component.commentElement = document.createElement('input');
    component.commentElement.value = 'Hello @';
    component.onClickOption('robintron');
    expect(component.commentElement.value).toBe('Hello @robintron ');
  });

  it('should have focused the input element, dispatched an input event and reset the filteredUsers', () => {
    component.commentElement = document.createElement('input');
    component.commentElement.value = '@';
    const focusSpy = spyOn(component.commentElement, 'focus');
    const dispatchSpy = spyOn(component.commentElement, 'dispatchEvent');
    component.onClickOption('r');
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new Event('input'));
    expect(component.filteredUsers.length).toBe(0);
  });

});
